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

  function makeQuiz(S, title, from) {
    const ws = from.flatMap(n => S[n].puzzles);
    return {
      title, isQuiz: true,
      questions: ws.map((p, i) => {
        const opts = shuffle([p.hint, ...shuffle(ws.filter(x => x !== p)).slice(0, 3).map(x => x.hint)]);
        return { question: `${i + 1}. What does '${p.vocab}' mean?`, options: opts, answer: opts.indexOf(p.hint) };
      })
    };
  }
  PRO[5] = makeQuiz(PRO, "Level 5 Quiz", [1, 2, 3, 4]);
  PRO[15] = makeQuiz(PRO, "Level 15: Quiz", [11, 12, 13, 14]);
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

  // ---------- Intermediate set ----------
  const MIDW = [
    [P("hesitant", "Slow to act because of uncertainty."), P("sincere", "Honest and free from pretense.")],
    [P("diligent", "Showing careful, steady effort."), P("adequate", "Enough or satisfactory for a purpose.")],
    [P("cautious", "Careful to avoid danger or mistakes."), P("frugal", "Careful about spending money; thrifty.")],
    [P("obstinate", "Stubbornly refusing to change one's mind."), P("vivid", "Producing strong, clear images in the mind.")],
    [P("reliable", "Consistently good and able to be trusted."), P("humble", "Having a modest view of one's own importance.")],
    [P("ambitious", "Having a strong desire to succeed."), P("fragile", "Easily broken or damaged.")],
    [P("persuade", "To convince someone to do or believe something."), P("gradual", "Happening slowly, in small steps.")],
    [P("hostile", "Unfriendly and aggressive."), P("initiate", "To begin or start something.")],
    [P("adapt", "To adjust to new conditions."), P("consistent", "Always behaving or happening in the same way.")],
    [P("fundamental", "Forming the basic, most important part."), P("intense", "Of extreme force, degree, or strength.")],
    [P("neglect", "To fail to care for properly."), P("flexible", "Able to change easily to suit new situations.")],
    [P("vague", "Not clearly expressed or defined."), P("prudent", "Acting with care and thought for the future.")],
    [P("jubilant", "Feeling or showing great happiness."), P("sufficient", "Enough to meet a need.")],
    [P("anticipate", "To expect or look forward to something."), P("contradict", "To say the opposite of what someone said.")],
    [P("coherent", "Logical and clearly connected."), P("reckless", "Acting without thinking about the consequences.")],
    [P("resourceful", "Good at finding clever ways to solve problems."), P("tolerant", "Willing to accept different opinions or behavior.")]
  ];
  const MID = {};
  NUMS.forEach((n, i) => { MID[n] = { title: "Level " + n, puzzles: MIDW[i] }; });
  MID[5] = makeQuiz(MID, "Level 5 Quiz", [1, 2, 3, 4]);
  MID[15] = makeQuiz(MID, "Level 15: Quiz", [11, 12, 13, 14]);
  MID[10] = {
    title: "Level 10: Paragraph Puzzle", isParagraph: true,
    textTemplate: "Although the hike looked dangerous, the guide was [1] and checked the weather twice. Her [2] approach to money meant the team had enough supplies without overspending, and everyone agreed she was [3] and trustworthy.",
    blanks: [
      { target: "cautious", options: ["cautious", "hostile", "vague"] },
      { target: "frugal", options: ["frugal", "fragile", "jubilant"] },
      { target: "reliable", options: ["reliable", "obstinate", "hesitant"] }
    ]
  };
  MID[20] = {
    title: "Level 20: Paragraph Puzzle", isParagraph: true,
    textTemplate: "When the schedule changed, the team had to [1] quickly. Their [2] effort throughout the project paid off, and the final report was [3] and easy to follow.",
    blanks: [
      { target: "adapt", options: ["adapt", "neglect", "initiate"] },
      { target: "diligent", options: ["diligent", "hostile", "reckless"] },
      { target: "coherent", options: ["coherent", "vague", "fragile"] }
    ]
  };

  const SETS = { beginner: BEG, intermediate: MID, advanced: PRO };
  const NAMES = { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" };
  const COLORS = { beginner: "bg-emerald-100 text-emerald-700", intermediate: "bg-amber-100 text-amber-800", advanced: "bg-rose-100 text-rose-700" };

  // ---------- Placement quiz: [question, correct answer, wrong, wrong, wrong] ----------
  const Q = [
    ["What does 'eager' mean?", "Very excited to do something", "Very tired", "Very angry", "Very quiet"],
    ["Choose the correct sentence.", "She goes to school every day.", "She go to school every day.", "She going to school every day.", "She goed to school every day."],
    ["Which word means 'very big'?", "Enormous", "Tiny", "Quiet", "Slow"],
    ["What does 'reluctant' mean?", "Unwilling and hesitant", "Eager to help", "Extremely careful", "Very generous"],
    ["Choose the correct sentence.", "If I had studied harder, I would have passed the test.", "If I would have studied harder, I would have passed the test.", "If I have studied harder, I would passed the test.", "If I studied harder, I would have pass the test."],
    ["Which word best fits: 'The scientist was ___, checking every detail twice.'", "meticulous", "conspicuous", "reluctant", "abundant"],
    ["What does 'ubiquitous' mean?", "Found everywhere", "Lasting a short time", "Hard to understand", "Overly generous"],
    ["Which sentence uses 'whom' correctly?", "To whom should I address the letter?", "Whom is calling me?", "Whom went to the store?", "I know whom is responsible."],
    ["A 'laconic' reply is one that is...", "brief and to the point", "long and detailed", "angry and loud", "vague and confusing"],
    ["Which sentence is grammatically correct?", "Had she known the truth, she would have acted differently.", "Had she knew the truth, she would act differently.", "If she had knew the truth, she would have act differently.", "Had she known the truth, she would acted differently."]
  ];
  let PL = { qs: [], i: 0, score: 0, sel: null, tier: "beginner" };
  const tierFor = s => (s >= 9 ? "advanced" : s >= 6 ? "intermediate" : "beginner");
  const normMode = m => (m === "pro" ? "advanced" : m || "beginner");

  // ---------- Progress per tier ----------
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
    Object.keys(LEVELS).forEach(k => delete LEVELS[k]);
    Object.assign(LEVELS, SETS[mode]);
    ALL_PUZZLES.length = 0;
    Object.values(LEVELS).forEach(l => l.puzzles && l.puzzles.forEach(p => ALL_PUZZLES.push(p)));
  }

  function applyTier(mode, score) {
    const rec = database[currentUser];
    if (!rec) return;
    const old = normMode(rec.mode);
    if (mode !== old) {
      rec.saved = rec.saved || {};
      const s = {};
      KEYS.forEach(k => { s[k] = rec[k]; });
      rec.saved[old] = s;
      const next = Object.assign(FRESH(), rec.saved[mode] || (mode === "advanced" ? rec.saved.pro : null) || {});
      KEYS.forEach(k => { rec[k] = next[k]; });
    }
    rec.mode = mode;
    rec.placed = true;
    rec.placement_score = score;
    saveUserRecord(currentUser);
    document.getElementById("placementModal").classList.add("hidden");
    showLevelSelect();
  }

  // ---------- Placement quiz screens ----------
  function plBody() { return document.getElementById("plBody"); }
  function plRender() {
    const q = PL.qs[PL.i];
    const canCancel = database[currentUser] && database[currentUser].placed;
    plBody().innerHTML = `
      <div class="flex justify-between items-center">
        <span class="text-xs font-bold bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">Question ${PL.i + 1}/10</span>
        ${canCancel ? '<button onclick="wfPlClose()" class="text-xs text-slate-500 hover:underline">Cancel</button>' : ""}
      </div>
      <p class="text-lg font-semibold text-slate-800">${esc(q.q)}</p>
      <div class="space-y-2">${q.opts.map((o, k) => `<button id="plo${k}" onclick="wfPlPick(${k})" class="w-full text-left px-4 py-3 border-2 border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-indigo-50 transition">${esc(o)}</button>`).join("")}</div>
      <button id="plNext" onclick="wfPlNext()" disabled class="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl shadow-md transition disabled:opacity-40">${PL.i === 9 ? "Finish" : "Next"}</button>`;
  }
  window.wfPlPick = k => {
    PL.sel = k;
    PL.qs[PL.i].opts.forEach((_, j) => {
      document.getElementById("plo" + j).className = "w-full text-left px-4 py-3 border-2 rounded-xl text-sm font-medium transition " +
        (j === k ? "border-indigo-500 bg-indigo-50 text-indigo-800" : "border-slate-200 text-slate-700 hover:bg-indigo-50");
    });
    document.getElementById("plNext").disabled = false;
  };
  window.wfPlNext = () => {
    if (PL.sel === null) return;
    const q = PL.qs[PL.i];
    if (q.opts[PL.sel] === q.a) PL.score++;
    PL.i++;
    PL.sel = null;
    if (PL.i < PL.qs.length) return plRender();
    PL.tier = tierFor(PL.score);
    plBody().innerHTML = `
      <div class="text-center space-y-3">
        <h3 class="text-xl font-extrabold text-slate-800">Your score: ${PL.score}/10</h3>
        <span class="inline-block text-sm font-bold px-4 py-1.5 rounded-full ${COLORS[PL.tier]}">${NAMES[PL.tier]} Level</span>
        <p class="text-sm text-slate-600">We will take you to the ${NAMES[PL.tier]} dashboard.</p>
      </div>
      <button onclick="wfPlFinish()" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-md transition">Go to my dashboard</button>`;
  };
  window.wfPlFinish = () => applyTier(PL.tier, PL.score);
  window.wfPlClose = () => document.getElementById("placementModal").classList.add("hidden");
  window.wfRetake = startPlacement;

  function startPlacement() {
    PL = {
      qs: shuffle(Q).map(([q, a, ...w]) => ({ q, a, opts: shuffle([a, ...w]) })),
      i: 0, score: 0, sel: null, tier: "beginner"
    };
    document.getElementById("placementModal").classList.remove("hidden");
    plRender();
  }

  function ensureUI() {
    if (document.getElementById("placementModal")) return;
    const d = document.createElement("div");
    d.id = "placementModal";
    d.className = "hidden fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50";
    d.innerHTML = '<div id="plBody" class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4"></div>';
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
    b.innerHTML = `
      <span class="text-xs font-bold px-3 py-1 rounded-full ${COLORS[mode]}">${NAMES[mode]} Level</span>
      <button onclick="wfRetake()" class="text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition">Retake placement quiz</button>`;
  }

  const origShow = showLevelSelect;
  window.showLevelSelect = function () {
    const rec = database[currentUser];
    if (!rec) return;
    ensureUI();
    const mode = normMode(rec.mode);
    loadLevels(mode);
    origShow();
    updateBar(mode);
    if (!rec.placed) startPlacement();
  };
})();
