import { useState } from 'react'

const explorationPrompt = `You are Claude, an AI assistant made by Anthropic. You're helping a program officer at a conservation philanthropy organization explore how AI could help with their specific work.

I'm going to describe my role and the kinds of tasks I do regularly. Please:

1. Ask me 3-4 follow-up questions to understand my work deeply — what takes the most time, what involves the most repetition, and where I wish I had more capacity.

2. Then suggest 3 specific ways I could use Claude to support my work, ranked by:
   - Time savings (how much time would this free up per week?)
   - Ease of adoption (could I start doing this today?)
   - Impact (would this meaningfully improve my work quality?)

3. For your top suggestion, walk me through exactly how I'd do it — step by step, as if I've never used an AI tool before.

Keep your language clear and grounded. I work in conservation and environmental philanthropy, not tech. Use concrete examples from my field, not generic ones.

Here's what I do:
[DESCRIBE YOUR ROLE AND TYPICAL TASKS]`

const synthesisPrompt = `You are Claude, an AI assistant. I'm a program officer at an environmental philanthropy. I'm going to paste a grantee progress report, and I need you to:

1. **Summarize** the report in 3-5 bullet points — what did the grantee accomplish this period?

2. **Flag** any milestones that appear behind schedule or at risk, with specific quotes from the report.

3. **Identify** 2-3 follow-up questions I should ask the grantee based on gaps or ambiguities in their reporting.

4. **Connect** this grantee's work to broader trends I should be aware of (policy windows, related scientific findings, complementary efforts by others in the field).

Format your response with clear headers. Be direct — I'd rather know about problems early than be surprised later.

Here's the report:
[PASTE GRANTEE REPORT]`

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
  { time: '~45 min', title: 'AI & Conservation: The Landscape', desc: 'What AI can do today, where it\'s headed, and what it means for philanthropy. Live demos with Claude.', icon: '\u{1F30D}' },
  { time: '~20 min', title: 'Breakout Sessions', desc: 'Explore use cases in small groups tailored to your work area.', icon: '\u{1F4AC}' },
  { time: '~15 min', title: 'Full Group Debrief', desc: 'Share discoveries, surface questions, and identify where to start.', icon: '\u{1F91D}' },
]

const breakoutGroups = [
  {
    name: 'Program Teams',
    lead: 'Jessica',
    color: 'bg-sage/10 border-sage/30',
    labelColor: 'text-sage',
    focus: [
      'Synthesizing field reports and monitoring data across portfolios',
      'Researching policy landscapes and scientific literature',
      'Drafting learning briefs and strategy documents',
      'Cross-portfolio pattern identification',
    ],
  },
  {
    name: 'Grants & Fiscal',
    lead: 'Rosina',
    color: 'bg-sky/10 border-sky/30',
    labelColor: 'text-sky',
    focus: [
      'Summarizing grant applications against program criteria',
      'Analyzing grantee progress reports and flagging risks',
      'Drafting correspondence in consistent, respectful tone',
      'Aggregating portfolio data for board reporting',
    ],
  },
  {
    name: 'Administration',
    lead: 'Sean',
    color: 'bg-earth/10 border-earth/30',
    labelColor: 'text-earth',
    focus: [
      'Converting meeting notes into action items and decision logs',
      'Drafting agendas, pre-reads, and follow-up summaries',
      'Turning program data into donor updates and narratives',
      'Supporting staff onboarding to new portfolios',
    ],
  },
]

const useCaseCategories = [
  {
    title: 'Research & Synthesis',
    icon: '\u{1F50D}',
    desc: 'Synthesize field reports, monitoring data, scientific literature, and policy landscapes across portfolios.',
    examples: [
      'Wildfire: Compare prescribed burn outcomes across geographies and tribal practitioners',
      'Open Rivers: Synthesize post-removal monitoring to identify recovery indicators',
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
            AI for Conservation: Exploring What's Possible
          </h1>
          <p className="text-lg text-white/80 mb-1">RLF Staff Retreat</p>
          <p className="text-base text-white/60">Resources Legacy Fund &nbsp;|&nbsp; Meet the Moment</p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-10">

        {/* Pre-work reminder */}
        <div className="bg-sage/10 border border-sage/30 rounded-xl p-5">
          <p className="text-sm font-semibold text-forest mb-2">Reflection Questions (Think About Before We Start)</p>
          <ol className="text-sm text-stone space-y-1.5 list-decimal list-inside">
            <li>What part of your work would you love to offload or spend less time on?</li>
            <li>What part of your job do you most want to <em>keep</em> doing yourself?</li>
          </ol>
        </div>

        {/* Section 1: Agenda */}
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

        {/* Section 2: What Is Claude */}
        <section>
          <SectionHeading number={2} title="What Is Claude?" />
          <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-forest/5 space-y-4">
            <p className="text-sm text-stone leading-relaxed">
              Claude is an AI assistant made by <strong>Anthropic</strong>, a safety-focused AI company.
              Think of it as a very capable research partner that can read, write, analyze, and synthesize
              information — but that always needs your judgment and expertise to be useful.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="bg-sage/5 rounded-lg p-4 border border-sage/10">
                <p className="font-semibold text-forest text-sm mb-1">It can</p>
                <ul className="text-xs text-stone/80 space-y-1">
                  <li>Read and summarize long documents</li>
                  <li>Draft text in specific tones</li>
                  <li>Analyze data and find patterns</li>
                  <li>Research and synthesize topics</li>
                </ul>
              </div>
              <div className="bg-earth/5 rounded-lg p-4 border border-earth/10">
                <p className="font-semibold text-earth text-sm mb-1">It can't</p>
                <ul className="text-xs text-stone/80 space-y-1">
                  <li>Access the internet in real time</li>
                  <li>Replace your domain expertise</li>
                  <li>Guarantee accuracy on facts</li>
                  <li>Make judgment calls for you</li>
                </ul>
              </div>
              <div className="bg-sky/5 rounded-lg p-4 border border-sky/10">
                <p className="font-semibold text-sky text-sm mb-1">Key principle</p>
                <p className="text-xs text-stone/80">
                  AI augments your work — it doesn't replace it. You bring the expertise, relationships, and judgment.
                  Claude brings speed, synthesis, and a tireless ability to process text.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Traffic Light */}
        <section>
          <SectionHeading number={3} title="What's Safe to Share with AI?" />
          <div className="grid gap-4 sm:grid-cols-3">
            <TrafficCard
              label="Don't Share"
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

        {/* Section 4: Use Case Categories */}
        <section>
          <SectionHeading number={4} title="Where AI Can Help at RLF" subtitle="Drawn from Phil's use case document across all 8 program areas" />
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

        {/* Section 5: Breakout Groups */}
        <section>
          <SectionHeading number={5} title="Breakout Groups" />
          <div className="space-y-4">
            {breakoutGroups.map((group, i) => (
              <div key={i} className={`rounded-xl p-5 border ${group.color}`}>
                <div className="flex items-center gap-2 mb-3">
                  <h3 className={`font-bold text-base ${group.labelColor}`}>{group.name}</h3>
                  <span className="text-xs font-medium bg-white/60 text-stone px-2 py-0.5 rounded-full">
                    Led by {group.lead}
                  </span>
                </div>
                <p className="text-xs font-medium text-stone/60 mb-2 uppercase tracking-wide">Discussion focus:</p>
                <ul className="space-y-1.5">
                  {group.focus.map((item, j) => (
                    <li key={j} className="text-sm text-stone/80 flex items-start gap-2">
                      <span className={`mt-0.5 flex-shrink-0 ${group.labelColor}`}>&#x2022;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 pt-3 border-t border-stone/10">
                  <p className="text-xs text-stone/50 italic">
                    Guiding question: "If AI could handle one thing for you every week, what would free up the most time for the work only you can do?"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Try It — Exploration Prompt */}
        <section>
          <SectionHeading number={6} title="Try It: Role Exploration" subtitle="Paste into Claude and describe your work" />
          <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-forest/5">
            <p className="text-sm text-stone/70 mb-4 leading-relaxed">
              Open <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-sage font-medium underline hover:text-sage/80">claude.ai</a> and
              paste this prompt. Then describe your role and typical tasks in your own words. Claude will help you identify where AI could support your specific work.
            </p>
            <div className="mb-4">
              <CopyButton text={explorationPrompt} />
            </div>
            <details className="group">
              <summary className="text-sm font-medium text-sage cursor-pointer hover:text-sage/80 select-none">
                View full prompt
              </summary>
              <pre className="mt-3 p-4 bg-cream rounded-lg text-xs text-stone/80 whitespace-pre-wrap overflow-x-auto leading-relaxed border border-forest/5">
                {explorationPrompt}
              </pre>
            </details>
          </div>
        </section>

        {/* Section 7: Try It — Report Synthesis */}
        <section>
          <SectionHeading number={7} title="Try It: Report Synthesis" subtitle="See Claude analyze a grantee report" />
          <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-forest/5">
            <p className="text-sm text-stone/70 mb-4 leading-relaxed">
              Have a grantee progress report handy? Paste this prompt into Claude, then add the report text.
              Watch it summarize, flag risks, and generate follow-up questions in seconds.
              <br /><br />
              <strong>Remember:</strong> Only use reports with non-sensitive, non-confidential content for this exercise.
              If in doubt, use a published report or case study instead.
            </p>
            <div className="mb-4">
              <CopyButton text={synthesisPrompt} />
            </div>
            <details className="group">
              <summary className="text-sm font-medium text-sage cursor-pointer hover:text-sage/80 select-none">
                View full prompt
              </summary>
              <pre className="mt-3 p-4 bg-cream rounded-lg text-xs text-stone/80 whitespace-pre-wrap overflow-x-auto leading-relaxed border border-forest/5">
                {synthesisPrompt}
              </pre>
            </details>
          </div>
        </section>

        {/* Section 8: Suggested Starting Points */}
        <section>
          <SectionHeading number={8} title="Where to Start" subtitle="Three high-value, low-risk pilots" />
          <div className="space-y-3">
            {[
              {
                num: 1,
                title: 'Grant Application Summarization',
                desc: 'Use Claude to summarize incoming LOIs or proposals against program criteria. Saves significant staff time and allows faster, more consistent initial screening.',
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

        {/* Section 9: What Comes Next */}
        <section>
          <SectionHeading number={9} title="What Comes Next" />
          <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-forest/5 space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="p-4 rounded-lg border border-sage/20 bg-sage/5">
                <h3 className="font-semibold text-forest text-sm mb-1">Governance Foundation</h3>
                <p className="text-xs text-stone/70">AI acceptable use policy, data handling guidelines, and staff readiness framework — so you can move fast with confidence.</p>
              </div>
              <div className="p-4 rounded-lg border border-sky/20 bg-sky/5">
                <h3 className="font-semibold text-sky text-sm mb-1">Pilot Programs</h3>
                <p className="text-xs text-stone/70">Start with the three suggested pilots. Measure time saved, quality maintained, and staff comfort level.</p>
              </div>
            </div>
            <div className="border-t border-forest/5 pt-4">
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
            <div className="bg-earth/5 border border-earth/20 rounded-lg p-4">
              <p className="text-sm text-stone/80 font-medium">
                Questions after today? Reach out to Joshua or Kim anytime. This is the beginning of the conversation, not the end.
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
