import { useState } from 'react'

const discoveryPrompt = `You are helping me identify workflows at an environmental philanthropy that could be automated using Microsoft Copilot Studio. I'm going to describe a staff member's daily/weekly tasks, and I need you to help me find the best automation candidates.

For each workflow the staff member describes, evaluate it on these criteria:
1. **Frequency**: How often is this done? (Daily/Weekly/Monthly)
2. **Time spent**: How long does it take each time?
3. **Consistency**: Does it follow the same steps every time, or vary significantly?
4. **Digital readiness**: Are the inputs and outputs already in digital systems (email, SharePoint, Excel, grants management system)?
5. **Pain level**: How frustrating is this task for the person doing it?

After I share the staff member's responses, please:
- List the top 3 automation candidates ranked by impact (time saved x frequency x feasibility)
- For the #1 candidate, describe the trigger event (what starts the workflow), the key steps, and the expected output
- Flag any workflows that sound good but might be too complex for a first project

Keep your language simple — the staff member is not technical. Use their words, not jargon.

Here's what the staff member told me about their repetitive tasks:
[PASTE STAFF RESPONSES HERE]`

const prdPrompt = `You are helping me create a Product Requirements Document (PRD) for an AI workflow automation at an environmental philanthropy. I need you to interview me about the workflow and produce a structured PRD that an IT team can build from.

Ask me these questions one at a time (wait for my answer before moving on):

**The Trigger**
1. What specific event starts this workflow? (e.g., "A grant application arrives," "A progress report is submitted," "It's the first Monday of the month")
2. How do you currently know it's time to do this task?

**The Inputs**
3. What information do you need to start? Where does it come from?
4. What systems or tools do you open to do this work? (SharePoint, Excel, Outlook, Teams, grants management system, etc.)

**The Steps**
5. Walk me through exactly what you do, step by step. Don't skip the "obvious" parts.
6. Are there any decision points where you do different things depending on the situation?

**The Outputs**
7. What does the finished product look like? (e.g., "An email is sent," "A row is added to a spreadsheet," "A summary memo is filed")
8. Who needs to see or receive the output?

**Edge Cases**
9. What goes wrong sometimes? What are the exceptions?
10. Is there anything that should STOP the workflow or require a human to step in?

**Success Criteria**
11. How would you know the automated version is working correctly?
12. What would make you trust it enough to stop doing it manually?

After I answer all questions, produce a structured PRD with these sections:
- Workflow Name
- Owner
- Trigger Event
- Inputs (with source systems)
- Process Steps (numbered, with decision branches)
- Outputs (with destination systems)
- Edge Cases and Exceptions
- Success Criteria (measurable)
- Systems and Permissions Required
- Estimated Time Savings`

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-2 px-5 py-3 rounded-lg font-semibold text-base transition-all duration-200 ${
        copied
          ? 'bg-sage text-white'
          : 'bg-earth text-white hover:bg-earth/90 active:scale-95'
      }`}
    >
      {copied ? (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy to Clipboard
        </>
      )}
    </button>
  )
}

const agendaItems = [
  { time: '15 min', title: 'Check-in & AI Landscape', desc: 'What\'s changed in AI since you last looked? Quick orientation to where things stand today.', icon: '\u{1F30D}' },
  { time: '5 min', title: 'The Workflow Factory', desc: 'How we turn everyday tasks into working Copilot automations.', icon: '\u{1F3ED}' },
  { time: '15 min', title: 'Paired Discovery Interview', desc: 'Interview your partner about their best automation candidate.', icon: '\u{1F50D}' },
  { time: '15 min', title: 'Build Your Requirements', desc: 'Turn your top task into a requirements document.', icon: '\u{1F4CB}' },
  { time: '8 min', title: 'Share-outs & Discussion', desc: 'What surprised you? What has the most potential?', icon: '\u{1F5E3}' },
  { time: '2 min', title: 'Next Steps', desc: 'Where to go from here.', icon: '\u{1F680}' },
]

const factorySteps = [
  { num: 1, label: 'Discovery', active: true },
  { num: 2, label: 'Requirements', active: true },
  { num: 3, label: 'Handoff', active: false },
  { num: 4, label: 'Build', active: false },
  { num: 5, label: 'Test', active: false },
  { num: 6, label: 'Production', active: false },
]

const useCaseCategories = [
  {
    title: 'Research & Synthesis',
    icon: '\u{1F50D}',
    desc: 'Synthesize field reports, monitoring data, scientific literature, and policy landscapes across portfolios.',
    examples: [
      'Wildfire: Compare prescribed burn outcomes across geographies',
      'Open Rivers: Synthesize post-removal monitoring for recovery indicators',
      'Ocean: Summarize stakeholder positions on contested ocean spaces',
      '30x30: Track progress at national, state, and regional levels',
    ],
  },
  {
    title: 'Grant Operations',
    icon: '\u{1F4CB}',
    desc: 'Speed up due diligence, surface risks early, and maintain consistency across grantee communications.',
    examples: [
      'Summarize incoming LOIs against funding criteria',
      'Flag milestone gaps in grantee progress reports',
      'Draft declination letters and award notifications',
      'Extract key data points into structured formats',
    ],
  },
  {
    title: 'Institutional Knowledge',
    icon: '\u{1F9E0}',
    desc: 'Preserve and share what your organization knows — across staff transitions, portfolios, and time.',
    examples: [
      'Onboard new program officers to portfolio history and context',
      'Maintain decision logs and correspondence archives',
      'Map connections across program areas in shared geographies',
      'Generate portfolio-level learning briefs from grantee data',
    ],
  },
]

function App() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-forest text-white py-10 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-3">
            AI for Conservation: From Tasks to Workflows
          </h1>
          <p className="text-lg text-white/80 mb-1">RLF Staff Retreat</p>
          <p className="text-base text-white/60">Resources Legacy Fund &nbsp;|&nbsp; Meet the Moment</p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-10">

        {/* Section 1: Today's Agenda */}
        <section>
          <SectionHeading number={1} title="Today's Agenda" />
          <div className="relative pl-8 sm:pl-10 space-y-0">
            <div className="absolute left-3 sm:left-4 top-2 bottom-2 w-0.5 bg-sage/20" />
            {agendaItems.map((item, i) => (
              <div key={i} className="relative pb-6 last:pb-0">
                <div className="absolute -left-5 sm:-left-6 top-1 w-4 h-4 rounded-full bg-sage border-2 border-cream" />
                <div className="bg-white rounded-xl p-4 shadow-sm border border-forest/5">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0" role="img" aria-hidden="true">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-semibold text-forest text-base">{item.title}</h3>
                        <span className="text-xs font-medium bg-earth/10 text-earth px-2 py-0.5 rounded-full">{item.time}</span>
                      </div>
                      <p className="text-sm text-stone/70">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Traffic Light */}
        <section>
          <SectionHeading number={2} title="Traffic Light: What's Safe to Share" />
          <div className="grid gap-4 sm:grid-cols-3">
            <TrafficCard
              label="Never Share"
              bgClass="bg-red-50 border-red-200"
              dotClass="bg-red-500"
              labelClass="text-red-700"
              items={[
                'Personally identifiable information',
                'Financial account numbers',
                'Passwords & credentials',
                'Tribal cultural knowledge',
                'Confidential grantee financials',
              ]}
            />
            <TrafficCard
              label="Use with Caution"
              bgClass="bg-amber-50 border-amber-200"
              dotClass="bg-amber-500"
              labelClass="text-amber-700"
              items={[
                'Draft grant proposals',
                'Internal strategy documents',
                'Grantee reports (anonymize first)',
                'Board materials in development',
              ]}
            />
            <TrafficCard
              label="Safe to Use"
              bgClass="bg-emerald-50 border-emerald-200"
              dotClass="bg-emerald-600"
              labelClass="text-emerald-700"
              items={[
                'Published research & reports',
                'Public policy documents',
                'Your own draft writing',
                'General research questions',
                'Meeting notes (non-sensitive)',
              ]}
            />
          </div>
          <p className="text-xs text-stone/50 mt-3 text-center">
            When in doubt, ask: "Would I be comfortable if this showed up in a data breach?" If not, don't paste it.
          </p>
        </section>

        {/* Section 3: The Workflow Factory */}
        <section>
          <SectionHeading number={3} title="The Workflow Factory" />
          <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-forest/5">
            <div className="flex items-center justify-between gap-1 mb-5 overflow-x-auto pb-2">
              {factorySteps.map((step, i) => (
                <div key={i} className="flex items-center flex-shrink-0">
                  <div className="flex flex-col items-center">
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                      step.active ? 'bg-sage text-white' : 'bg-stone/10 text-stone/40'
                    }`}>
                      {step.num}
                    </div>
                    <span className={`text-xs mt-1 font-medium ${step.active ? 'text-sage' : 'text-stone/40'}`}>
                      {step.label}
                    </span>
                  </div>
                  {i < factorySteps.length - 1 && (
                    <div className={`w-4 sm:w-8 h-0.5 mx-1 ${
                      step.active && factorySteps[i + 1]?.active ? 'bg-sage/40' : 'bg-stone/10'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <p className="text-sm font-semibold text-earth mb-2">
              Today we're doing Steps 1 and 2: finding your best task and defining what it needs.
            </p>
            <p className="text-sm text-stone/70 leading-relaxed">
              The Workflow Factory is a repeatable process for turning staff pain points into working Copilot automations.
              You identify the task, we help define the requirements, and your team builds it in Copilot Studio.
            </p>
          </div>
        </section>

        {/* Section 4: Where AI Can Help at RLF */}
        <section>
          <SectionHeading number={4} title="Where AI Can Help at RLF" subtitle="Use cases across all 8 program areas — think about which ones resonate with your work" />
          <div className="space-y-4">
            {useCaseCategories.map((cat, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-forest/5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{cat.icon}</span>
                  <div>
                    <h3 className="font-semibold text-forest text-base">{cat.title}</h3>
                    <p className="text-xs text-stone/60">{cat.desc}</p>
                  </div>
                </div>
                <ul className="space-y-1.5 ml-1">
                  {cat.examples.map((ex, j) => (
                    <li key={j} className="text-sm text-stone/80 flex items-start gap-2">
                      <span className="text-sage mt-0.5 flex-shrink-0">&#x2022;</span>
                      <span>{ex}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Discovery Interview Prompt */}
        <section>
          <SectionHeading number={5} title="Discovery Interview" subtitle="Use with Your Partner" />
          <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-forest/5">
            <p className="text-sm text-stone/70 mb-4 leading-relaxed">
              Pair up. One person pastes this prompt into Copilot and acts as interviewer.
              The other describes their most repetitive task. Then swap roles.
            </p>
            <div className="mb-4">
              <CopyButton text={discoveryPrompt} />
            </div>
            <details className="group">
              <summary className="text-sm font-medium text-sage cursor-pointer hover:text-sage/80 select-none">
                View full prompt
              </summary>
              <pre className="mt-3 p-4 bg-cream rounded-lg text-xs text-stone/80 whitespace-pre-wrap overflow-x-auto leading-relaxed border border-forest/5">
                {discoveryPrompt}
              </pre>
            </details>
          </div>
        </section>

        {/* Section 6: PRD Prompt */}
        <section>
          <SectionHeading number={6} title="Build Your Requirements" subtitle="Define Your Workflow" />
          <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-forest/5">
            <p className="text-sm text-stone/70 mb-4 leading-relaxed">
              Take your top task from the Discovery interview. Paste this prompt into Copilot and
              answer the questions. Goal: a requirements document clear enough that someone else could build this as a Copilot Agent for you.
            </p>
            <div className="mb-4">
              <CopyButton text={prdPrompt} />
            </div>
            <details className="group">
              <summary className="text-sm font-medium text-sage cursor-pointer hover:text-sage/80 select-none">
                View full prompt
              </summary>
              <pre className="mt-3 p-4 bg-cream rounded-lg text-xs text-stone/80 whitespace-pre-wrap overflow-x-auto leading-relaxed border border-forest/5">
                {prdPrompt}
              </pre>
            </details>
          </div>
        </section>

        {/* Section 7: Suggested Starting Points */}
        <section>
          <SectionHeading number={7} title="High-Value Starting Points" subtitle="Three pilots with fast, visible returns" />
          <div className="space-y-3">
            {[
              {
                num: 1,
                title: 'Grant Application Summarization',
                desc: 'Use Copilot to summarize incoming LOIs or proposals against program criteria. Saves significant staff time and allows faster, more consistent initial screening.',
              },
              {
                num: 2,
                title: 'Grantee Report Analysis',
                desc: 'Review progress reports, flag milestone gaps or risks, and draft follow-up questions. Especially valuable across large portfolios where careful reading of every report is hard to sustain.',
              },
              {
                num: 3,
                title: 'Portfolio-Level Learning Briefs',
                desc: 'Synthesize learning across grantee reports into short briefs capturing what\'s working, what\'s uncertain, and what questions remain. Supports adaptive management without a dedicated learning staffer.',
              },
            ].map((item) => (
              <div key={item.num} className="bg-white rounded-xl p-5 shadow-sm border border-forest/5 flex gap-4">
                <div className="w-10 h-10 rounded-full bg-sage text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {item.num}
                </div>
                <div>
                  <h3 className="font-semibold text-forest text-base mb-1">{item.title}</h3>
                  <p className="text-sm text-stone/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 8: Resources & Next Steps */}
        <section>
          <SectionHeading number={8} title="Resources & Next Steps" />
          <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-forest/5 space-y-4">
            <div className="border-b border-forest/5 pb-4">
              <h3 className="font-semibold text-forest text-sm mb-2">Key Principles for AI at RLF</h3>
              <ul className="text-sm text-stone/70 space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-sage mt-0.5">&#x2022;</span>
                  <span><strong>Augment, don't replace.</strong> AI handles the synthesis; you bring the judgment, relationships, and expertise.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sage mt-0.5">&#x2022;</span>
                  <span><strong>Start where it's safe.</strong> Published data, your own writing, general research. Build comfort before complexity.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sage mt-0.5">&#x2022;</span>
                  <span><strong>Verify everything.</strong> AI can be confidently wrong. Always check facts, citations, and data before acting on them.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sage mt-0.5">&#x2022;</span>
                  <span><strong>Protect sensitive work.</strong> Tribal knowledge, community data, and confidential grantee information require special care and clear policies.</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-forest text-sm mb-2">Ongoing Support</h3>
              <ul className="text-sm text-stone/70 space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-sage mt-0.5">&#x2022;</span>
                  <span><strong>Teams Channel</strong> — Post questions anytime</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sage mt-0.5">&#x2022;</span>
                  <span><strong>Office Hours</strong> — Drop-in support sessions</span>
                </li>
              </ul>
            </div>
            <div className="bg-earth/5 border border-earth/20 rounded-lg p-4">
              <p className="text-sm text-stone/80 font-medium">
                Save your PRD! If you want your workflow considered for the Copilot Agent Factory, share it with Joshua or Kim.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-forest text-white/60 py-8 px-6 mt-6">
        <div className="max-w-3xl mx-auto text-center space-y-2">
          <p className="text-white/80 font-medium text-sm">Meet the Moment — Prepared for Resources Legacy Fund</p>
          <p className="text-sm">joshua@mtm.now &nbsp;|&nbsp; kim@mtm.now</p>
          <p className="text-xs text-white/40 mt-3">This session guide was prepared with AI assistance and reviewed by Joshua Peskay and Kim Snyder.</p>
        </div>
      </footer>
    </div>
  )
}

function SectionHeading({ number, title, subtitle }) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-3 mb-1">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-sage text-white text-sm font-bold flex-shrink-0">
          {number}
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-forest">{title}</h2>
      </div>
      {subtitle && <p className="text-sm text-stone/50 ml-10">{subtitle}</p>}
    </div>
  )
}

function TrafficCard({ label, bgClass, dotClass, labelClass, items }) {
  return (
    <div className={`rounded-xl p-4 border ${bgClass}`}>
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-3.5 h-3.5 rounded-full ${dotClass}`} />
        <h3 className={`font-bold text-sm uppercase tracking-wide ${labelClass}`}>{label}</h3>
      </div>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-stone/70">{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
