// WordForge: Beginner / Pro mode add-on. Load AFTER the main script.
(function () {
  const BEG = JSON.parse(JSON.stringify(LEVELS));
  const P = (v, h) => ({ vocab: v, hint: h });
  const NUMS = [1, 2, 3, 4, 6, 7, 8, 9, 11, 12, 13, 14, 16, 17, 18, 19];
  const WORDS = [
    [P("ephemeral", "Lasting for a very short time."), P("ubiquitous", "Present or found everywhere.")],
    [P("obsequious", "Obedient or attentive to an excessive degree."), P("perspicacious", "Having a ready insight into things; shrewd.")],
    [P("ostentatious", "Designed to impress or attract notice; showy."), P("laconic", "Using very few words.")],
    [P("capricious", "Given to sudden, unaccountable changes of mood."), P("recalcitrant", "Stubbornly resistant to authority or control.")],
    [P("equivocal", "Open to more than one interpretation; deliberately vague."), P("magnanimous", "Very generous or forgiving, especially toward a rival.")],
    [P("sycophantic", "Praising people in power in an insincere way."), P("pernicious", "Having a harmful effect, especially in a gradual way.")],
    [P("acrimonious", "Angry and bitter, typically in speech or debate."), P("ameliorate", "To make something bad or unsatisfactory better.")],
    [P("inexorable", "Impossible to stop or prevent."), P("mercurial", "Subject to sudden, unpredictable changes of mood.")],
    [P("pellucid", "Translucently clear; easily understood."), P("tenuous", "Very weak or slight.")],
    [P("obfuscate", "To make unclear or difficult to understand."), P("indefatigable", "Persisting tirelessly.")],
    [P("esoteric", "Understood by only a small number of people with specialized knowledge."), P("ineffable", "Too great or extreme to be expressed in words.")],
    [P("sanguine", "Optimistic, especially in a difficult situation."), P("pusillanimous", "Showing a lack of courage.")],
    [P("quixotic", "Exceedingly idealistic; unrealistic and impractical."), P("spurious", "Not genuine; false or fake.")],
    [P("ebullient", "Cheerful and full of energy."), P("taciturn", "Reserved or uncommunicative in speech.")],
    [P("intransigent", "Unwilling to change one's views or agree."), P("juxtapose", "To place close together for contrasting effect.")],
    [P("vicissitude", "A change of circumstances or fortune, typically unwelcome."), P("unequivocal", "Leaving no doubt; completely clear.")]
  ];

  const PRO = {};
  NUMS.forEach((n, i) => { PRO[n] = { title: "Level " + n, puzzles: WORDS[i] }; });

  function makeQuiz(title, from) {
    const ws = from.flatMap(n => PRO[n].puzzles);
    return {
      title, isQuiz: true,
      questions: ws.map((p, i) => {
        const opts = shuffle([p.hint, ...shuffle(ws.filter(x => x !== p)).slice(0, 3).map(x => x.hint)]);
        return { question: `${i + 1}. What does '${p.vocab}' mean?`, options: opts, answer: opts.indexOf(p.hint) };
      })
    };
  }
  PRO[5] = makeQuiz("Level 5 Quiz", [1, 2, 3, 4]);
  PRO[15] = makeQuiz("Level 15: Quiz", [11, 12, 13, 14]);
  PRO[10] = {
    title: "Level 10: Paragraph Puzzle", isParagraph: true,
    textTemplate: "The senator's popularity proved [1], vanishing within a month. His aide, who was [2] toward every donor, gave [3] answers when reporters asked about the scandal.",
    blanks: [
      { target: "ephemeral", options: ["ephemeral", "laconic", "magnanimous"] },
      { target: "obsequious", options: ["obsequious", "capricious", "ubiquitous"] },
      { target: "equivocal", options: ["equivocal", "ostentatious", "acrimonious"] }
    ]
  };
  PRO[20] = {
    title: "Level 20: Paragraph Puzzle", isParagraph: true,
    textTemplate: "The critic's review was [1], leaving no doubt about her verdict, though the debate that followed turned [2]. Still, the author remained [3] and kept writing.",
    blanks: [
      { target: "unequivocal", options: ["unequivocal", "tenuous", "taciturn"] },
      { target: "acrimonious", options: ["acrimonious", "ebullient", "spurious"] },
      { target: "sanguine", options: ["sanguine", "intransigent", "esoteric"] }
    ]
  };

  // Progress fields that belong to one mode
  const KEYS = ["ratings", "unlocked", "weak_words", "quiz_l5", "quiz_l15", "para_l10", "para_l20", "system_feedback"];
  const FRESH = () => ({
    ratings: {}, unlocked: { 1: true }, weak_words: {},
    quiz_l5: "Not Taken", quiz_l15: "Not Taken", para_l10: "Not Taken", para_l20: "Not Taken",
    system_feedback: "Welcome! Complete Level 1 to receive your first evaluation."
  });

  let loaded = null;
  function loadLevels(mode) {
    if (loaded === mode) return;
    loaded = mode;
    const src = mode === "pro" ? PRO : BEG;
    Object.keys(LEVELS).forEach(k => delete LEVELS[k]);
    Object.assign(LEVELS, src);
    ALL_PUZZLES.length = 0;
    Object.values(LEVELS).forEach(l => l.puzzles && l.puzzles.forEach(p => ALL_PUZZLES.push(p)));
  }

  function switchMode(mode) {
    const rec = database[currentUser];
    if (!rec) return;
    const old = rec.mode || "beginner"; // existing progress counts as Beginner
    if (mode !== old) {
      rec.saved = rec.saved || {};
      const s = {};
      KEYS.forEach(k => { s[k] = rec[k]; });
      rec.saved[old] = s;
      const next = Object.assign(FRESH(), rec.saved[mode] || {});
      KEYS.forEach(k => { rec[k] = next[k]; });
    }
    rec.mode = mode;
    saveUserRecord(currentUser);
    document.getElementById("modePicker").classList.add("hidden");
    showLevelSelect();
  }
  window.wfPickMode = switchMode;
  window.wfToggleMode = () => switchMode(database[currentUser].mode === "pro" ? "beginner" : "pro");

  function ensureUI() {
    if (document.getElementById("modePicker")) return;
    const d = document.createElement("div");
    d.id = "modePicker";
    d.className = "hidden fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50";
    d.innerHTML = `
      <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 text-center">
        <h3 class="text-xl font-extrabold text-slate-800">Choose your level</h3>
        <p class="text-sm text-slate-600">Are you a Beginner or a Pro? You can switch any time.</p>
        <button onclick="wfPickMode('beginner')" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-md transition">Beginner: everyday vocabulary</button>
        <button onclick="wfPickMode('pro')" class="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-xl shadow-md transition">Pro: advanced vocabulary</button>
      </div>`;
    document.body.appendChild(d);
  }

  function updateBar(mode) {
    let b = document.getElementById("modeBar");
    if (!b) {
      b = document.createElement("div");
      b.id = "modeBar";
      b.className = "flex flex-wrap items-center justify-between gap-2 mb-4 p-3 bg-slate-50 border border-slate-200 rounded-xl";
      const m = document.getElementById("levelMap");
      m.insertBefore(b, m.firstChild);
    }
    const pro = mode === "pro";
    b.innerHTML = `
      <span class="text-xs font-bold px-3 py-1 rounded-full ${pro ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700"}">${pro ? "Pro Mode" : "Beginner Mode"}</span>
      <button onclick="wfToggleMode()" class="text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition">Switch to ${pro ? "Beginner" : "Pro"}</button>`;
  }

  const origShow = showLevelSelect;
  window.showLevelSelect = function () {
    const rec = database[currentUser];
    if (!rec) return;
    ensureUI();
    const mode = rec.mode || "beginner";
    loadLevels(mode);
    origShow();
    updateBar(mode);
    if (!rec.mode) document.getElementById("modePicker").classList.remove("hidden");
  };
})();
