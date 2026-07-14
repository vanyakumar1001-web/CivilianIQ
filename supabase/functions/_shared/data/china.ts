export const entries = [
  {
    "id": "CN_ID_001_street_check",
    "country": "CN",
    "category": "ID_CHECK",
    "sub_issue": "IDENTITY_CHECK",
    "trigger_keywords": [
      "查身份证",
      "check my ID",
      "id check",
      "police stopped me on street",
      "盘查"
    ],
    "situation_description": "Police stop you on the street and ask to check your resident ID card (居民身份证)",
    "right_plain": "Police may check your ID card when they have reasonable grounds under specific circumstances (e.g. suspected crime, public security incident, or an ID checkpoint). You are generally required to carry and show your ID card when lawfully asked. You can ask the officer to show their own police ID (警察证) and state the reason for the check.",
    "right_formal": "Resident Identity Card Law Art. 15; People's Police Law Art. 9",
    "script": "您好，请出示您的警官证，并说明检查的原因。我的身份证在这里。",
    "escalation": [
      "Ask to see the officer's police ID (警察证)",
      "Ask the specific reason for the check",
      "Comply by showing your ID card",
      "Note the officer's name/badge number and the police station (派出所)",
      "If you believe the check was unlawful, file a complaint with the local Public Security Bureau (公安局) or call 12389"
    ],
    "what_not_to_do": "Do not refuse to show your ID once a lawful reason is given. Do not physically resist even if you disagree — raise concerns afterward through a complaint.",
    "source_statutes": [
      "Resident Identity Card Law Art. 15",
      "People's Police Law Art. 9"
    ],
    "severity": "low"
  },
  {
    "id": "CN_TRAFFIC_001_documents",
    "country": "CN",
    "category": "TRAFFIC_STOP",
    "sub_issue": "REQUIRED_DOCUMENTS",
    "trigger_keywords": [
      "交警拦车",
      "traffic police stopped me",
      "driver's license check",
      "驾驶证"
    ],
    "situation_description": "Traffic police (交警) stop your vehicle and ask for documents",
    "right_plain": "You must show your driver's license (驾驶证), vehicle registration (行驶证), and proof of compulsory insurance when asked during a lawful traffic stop. You are not required to answer unrelated questions beyond the traffic matter itself.",
    "right_formal": "Road Traffic Safety Law Art. 95",
    "script": "警官您好，这是我的驾驶证、行驶证和保险单。",
    "escalation": [
      "Provide the required documents calmly",
      "Ask the specific reason for the stop if unclear",
      "Note the officer's number if you plan to dispute a penalty",
      "Traffic penalties can be formally contested through the traffic bureau's review process (行政复议) or in court",
      "Keep a copy or photo of any ticket issued"
    ],
    "what_not_to_do": "Do not argue at the roadside about a disputed fine — pay or contest it through the proper administrative process afterward. Do not drive away before being told you may leave.",
    "source_statutes": [
      "Road Traffic Safety Law Art. 95"
    ],
    "severity": "low"
  },
  {
    "id": "CN_TRAFFIC_002_phone_search",
    "country": "CN",
    "category": "TRAFFIC_STOP",
    "sub_issue": "DEVICE_SEARCH",
    "trigger_keywords": [
      "检查手机",
      "search my phone",
      "unlock your phone",
      "查看手机"
    ],
    "situation_description": "Police ask to check or unlock your phone during a traffic stop or street check",
    "right_plain": "Searching the contents of your phone generally requires a proper legal basis (such as being a criminal suspect with an approved search) rather than a routine traffic or ID check. You may politely ask for the legal basis before agreeing to unlock your device.",
    "right_formal": "Criminal Procedure Law Art. 138-144 (search provisions); Constitution Art. 40 (freedom and privacy of correspondence)",
    "script": "请问检查我手机的法律依据是什么？如果没有搜查的法律依据，我希望了解清楚后再配合。",
    "escalation": [
      "Ask politely for the legal basis of the request",
      "Note the officer's details and the police station",
      "If your phone is taken, ask for a receipt (清单/凭证)",
      "Consult a lawyer or 12348 legal aid afterward if you believe the search was improper",
      "File a complaint with the Public Security Bureau's supervision office (督察) if needed"
    ],
    "what_not_to_do": "Do not delete anything from your phone. Do not physically resist if an officer insists — comply while noting your objection, and follow up afterward through the proper channels.",
    "source_statutes": [
      "Criminal Procedure Law Art. 138-144",
      "Constitution Art. 40"
    ],
    "severity": "high"
  },
  {
    "id": "CN_SUMMONS_001_questioning",
    "country": "CN",
    "category": "SUMMONS",
    "sub_issue": "SUMMONS_DURATION",
    "trigger_keywords": [
      "传唤",
      "summoned for questioning",
      "police want to question me",
      "叫我去派出所"
    ],
    "situation_description": "Police summon you (传唤) to a police station for questioning",
    "right_plain": "A summons for questioning may generally last up to 12 hours; in complex cases involving serious offences it may extend to 24 hours. Your family should generally be notified of the summons unless notification would impede the investigation. You are not required to remain beyond the lawful time limit.",
    "right_formal": "Criminal Procedure Law Art. 117",
    "script": "请问这次传唤预计需要多长时间？可以通知我的家人吗？",
    "escalation": [
      "Ask the expected duration and the reason for questioning",
      "Ask that your family be notified",
      "Keep track of the time the summons began",
      "If held beyond the lawful limit, calmly raise this and ask to leave",
      "Contact a lawyer or 12348 legal aid if the summons is prolonged or repeated without clear cause"
    ],
    "what_not_to_do": "Do not sign a statement you have not read carefully. Do not resist a lawful summons — comply and raise concerns about duration through the proper channels.",
    "source_statutes": [
      "Criminal Procedure Law Art. 117"
    ],
    "severity": "medium"
  },
  {
    "id": "CN_INTERROGATION_001_self_incrimination",
    "country": "CN",
    "category": "INTERROGATION",
    "sub_issue": "RIGHT_AGAINST_COMPULSION",
    "trigger_keywords": [
      "do i have to answer",
      "interrogation",
      "审讯",
      "如实回答",
      "被讯问"
    ],
    "situation_description": "You are being questioned or interrogated by police as a suspect",
    "right_plain": "Chinese law does not provide a broad 'right to remain silent' like some other countries. Instead, the law prohibits compelling anyone to prove their own guilt (不得强迫自证其罪), while separately expecting suspects to answer questions truthfully (如实回答) — these two provisions coexist and are genuinely nuanced, so getting a lawyer involved as early as possible matters a great deal.",
    "right_formal": "Criminal Procedure Law Art. 52 (no forced self-incrimination); Art. 120 (duty to answer truthfully, with exceptions for questions unrelated to the case)",
    "script": "我希望在回答问题前联系我的律师。",
    "escalation": [
      "Ask to contact a lawyer as early as possible",
      "You may decline to answer questions clearly unrelated to the case",
      "Do not sign a statement (笔录) without reading it fully and having a lawyer review it if possible",
      "Family or the suspect can retain a lawyer at any stage of the process",
      "Contact 12348 for free legal aid consultation if you cannot afford a lawyer"
    ],
    "what_not_to_do": "Do not assume total silence is a safe legal strategy the way it might be elsewhere — the legal framework here is different. Do not sign anything without understanding it.",
    "source_statutes": [
      "Criminal Procedure Law Art. 52",
      "Criminal Procedure Law Art. 120"
    ],
    "severity": "critical"
  },
  {
    "id": "CN_LEGAL_AID_001_right_to_lawyer",
    "country": "CN",
    "category": "LEGAL_AID",
    "sub_issue": "RIGHT_TO_COUNSEL",
    "trigger_keywords": [
      "我要请律师",
      "i want a lawyer",
      "legal aid",
      "法律援助",
      "12348"
    ],
    "situation_description": "You or a family member wants to retain a lawyer during a criminal case",
    "right_plain": "A criminal suspect has the right to retain a defense lawyer from the time they are first questioned or from the day compulsory measures are taken. If you cannot afford one, free legal aid may be available through the government's legal aid system, especially for certain categories of cases and defendants.",
    "right_formal": "Criminal Procedure Law Art. 34; Legal Aid Law",
    "script": "我要委托律师为我辩护，请通知我的家人联系律师。",
    "escalation": [
      "Ask that your family be notified so they can retain a lawyer",
      "Call the national legal aid hotline 12348 for free consultation and referrals",
      "Ask whether you qualify for appointed legal aid if you cannot afford a lawyer",
      "A lawyer can request to meet with a detained suspect, generally without the meeting being monitored",
      "Keep any lawyer's contact information and case number for follow-up"
    ],
    "what_not_to_do": "Do not wait until trial to seek legal help — early legal advice matters most during the investigation stage. Do not rely only on verbal promises about legal aid; get details in writing where possible.",
    "source_statutes": [
      "Criminal Procedure Law Art. 34",
      "Legal Aid Law"
    ],
    "severity": "high"
  },
  {
    "id": "CN_DETAIN_001_administrative",
    "country": "CN",
    "category": "ADMINISTRATIVE_DETENTION",
    "sub_issue": "XINGZHENG_JULIU",
    "trigger_keywords": [
      "行政拘留",
      "administrative detention",
      "15 days detention",
      "治安拘留"
    ],
    "situation_description": "You are placed under administrative detention (行政拘留) for a minor public order offence, not a crime",
    "right_plain": "Administrative detention is a non-criminal penalty for minor offences under the Public Security Administration Punishments Law, generally lasting up to 15 days (up to 20 days if combined offences apply). You have the right to a hearing/explanation of the decision and the right to apply for administrative reconsideration or file an administrative lawsuit against the decision.",
    "right_formal": "Public Security Administration Punishments Law Art. 16, Art. 94-97 (procedural rights); Art. 107 (right to reconsideration/lawsuit)",
    "script": "请出示行政处罚决定书，并说明我可以申请复议或提起行政诉讼的期限和程序。",
    "escalation": [
      "Ask for the written administrative penalty decision (行政处罚决定书)",
      "Note the specific legal basis cited for the detention",
      "You generally have 60 days to apply for administrative reconsideration (行政复议), or 6 months to file an administrative lawsuit (行政诉讼)",
      "Contact family so they know your whereabouts",
      "Consult 12348 legal aid about challenging the decision"
    ],
    "what_not_to_do": "Do not miss the reconsideration/lawsuit deadlines if you intend to challenge the decision. Do not sign an acknowledgment of the penalty you disagree with without noting your objection.",
    "source_statutes": [
      "Public Security Administration Punishments Law Art. 16",
      "Art. 94-97",
      "Art. 107"
    ],
    "severity": "high"
  },
  {
    "id": "CN_DETAIN_002_criminal",
    "country": "CN",
    "category": "CRIMINAL_DETENTION",
    "sub_issue": "XINGSHI_JULIU",
    "trigger_keywords": [
      "刑事拘留",
      "criminal detention",
      "detained by police for a crime",
      "拘留证"
    ],
    "situation_description": "You are placed under criminal detention (刑事拘留) on suspicion of a crime",
    "right_plain": "After criminal detention, police must generally notify the detained person's family within 24 hours, except where notification would hinder the investigation or there is no way to notify them. Detention can last up to 3 days before a decision on formal arrest is needed, extendable to 7 days, or up to 30 days in special circumstances, after which the procuratorate must decide whether to approve arrest.",
    "right_formal": "Criminal Procedure Law Art. 83, 85-91",
    "script": "请出示拘留证，并尽快通知我的家人。",
    "escalation": [
      "Ask to see the detention warrant (拘留证)",
      "Ask that family be notified within the legal 24-hour window",
      "Track the detention timeline (3/7/30-day review points)",
      "Retain a lawyer as early as possible — they can request a meeting",
      "If the time limits are exceeded without a documented legal reason, this can be raised with the procuratorate (检察院) which supervises detention legality"
    ],
    "what_not_to_do": "Do not assume no news is good news — actively track the legal deadlines. Do not sign documents without a lawyer's review if at all possible.",
    "source_statutes": [
      "Criminal Procedure Law Art. 83",
      "Art. 85-91"
    ],
    "severity": "critical"
  },
  {
    "id": "CN_ARREST_001_formal_arrest",
    "country": "CN",
    "category": "ARREST",
    "sub_issue": "APPROVED_ARREST",
    "trigger_keywords": [
      "逮捕",
      "formal arrest",
      "procuratorate approved arrest",
      "批捕"
    ],
    "situation_description": "The procuratorate (检察院) has approved formal arrest (逮捕) following criminal detention",
    "right_plain": "Formal arrest requires procuratorate approval and is reserved for more serious matters than detention. Family must generally be notified within 24 hours of the arrest, with the same limited exceptions as detention. A lawyer can request to meet with the arrested person, and the case then moves toward investigation, prosecution review, and possible trial with defined statutory time limits for each stage.",
    "right_formal": "Criminal Procedure Law Art. 91, Art. 92 (notification requirement)",
    "script": "请提供逮捕决定书，我要委托律师，并请通知我的家人。",
    "escalation": [
      "Ask for the arrest decision document",
      "Confirm family has been notified",
      "Retain a lawyer immediately if you have not already",
      "Ask your lawyer to track the statutory time limits for each stage of the case",
      "Bail pending trial (取保候审) may be possible in some cases — ask your lawyer about eligibility"
    ],
    "what_not_to_do": "Do not go without legal representation for an extended period — this is the point where having a lawyer matters most. Do not assume the case will resolve quickly without tracking the formal timeline.",
    "source_statutes": [
      "Criminal Procedure Law Art. 91",
      "Art. 92"
    ],
    "severity": "critical"
  },
  {
    "id": "CN_RSDL_001_designated_residence",
    "country": "CN",
    "category": "RESIDENTIAL_SURVEILLANCE",
    "sub_issue": "DESIGNATED_LOCATION",
    "trigger_keywords": [
      "指定居所监视居住",
      "residential surveillance",
      "designated location",
      "监视居住"
    ],
    "situation_description": "You or a family member is placed under 'residential surveillance at a designated location' (指定居所监视居住), used in certain serious cases instead of ordinary detention",
    "right_plain": "This measure is formally distinct from criminal detention and is only meant to apply in specific serious-crime categories (e.g. endangering state security, terrorism, or serious bribery) when residential surveillance at the person's own home is not practical. Family notification is required within 24 hours except in the same limited exception cases as detention. This measure has drawn significant scrutiny from legal and human rights observers over how it is applied in practice, so getting a lawyer involved immediately is especially important.",
    "right_formal": "Criminal Procedure Law Art. 75-77",
    "script": "请提供监视居住决定书的法律依据，并尽快通知我的家人和律师。",
    "escalation": [
      "Ask for the written decision and its legal basis",
      "Insist that family and a lawyer be notified as the law requires",
      "This measure has a maximum duration (generally up to 6 months) that should be tracked",
      "A lawyer can push to confirm the case genuinely falls into a category eligible for this measure",
      "Family should keep detailed records of dates and any communication received from authorities"
    ],
    "what_not_to_do": "Do not assume this is the same as being under investigation at home informally — it is a formal legal measure with specific rules that should be followed. Do not delay contacting a lawyer.",
    "source_statutes": [
      "Criminal Procedure Law Art. 75-77"
    ],
    "severity": "critical"
  },
  {
    "id": "CN_SEARCH_001_home_search",
    "country": "CN",
    "category": "SEARCH",
    "sub_issue": "HOME_SEARCH",
    "trigger_keywords": [
      "搜查我家",
      "search my home",
      "police searching house",
      "搜查证"
    ],
    "situation_description": "Police want to search your home",
    "right_plain": "A home search generally requires a search warrant (搜查证) issued through the proper process, except in narrowly defined urgent circumstances. You can ask to see the search warrant before the search begins, and a witness not connected to the case should generally be present during the search.",
    "right_formal": "Criminal Procedure Law Art. 138-144",
    "script": "请出示搜查证。",
    "escalation": [
      "Ask to see the search warrant before allowing the search",
      "Note the names of officers present and any witness present",
      "Ask for an inventory list (清单) of anything taken, signed by the officers and a witness",
      "Contact a lawyer as soon as possible afterward",
      "A search conducted without proper legal basis can be challenged through a lawyer or the procuratorate"
    ],
    "what_not_to_do": "Do not physically obstruct a search even if you believe it is improper — object verbally, note the details, and raise it through a lawyer afterward.",
    "source_statutes": [
      "Criminal Procedure Law Art. 138-144"
    ],
    "severity": "critical"
  },
  {
    "id": "CN_COMPLAINT_001_misconduct",
    "country": "CN",
    "category": "FILING_COMPLAINT",
    "sub_issue": "POLICE_MISCONDUCT",
    "trigger_keywords": [
      "投诉警察",
      "file a complaint against police",
      "police misconduct",
      "督察"
    ],
    "situation_description": "You want to file a complaint about police misconduct",
    "right_plain": "Complaints about police conduct can be made to the internal supervision office (督察) of the Public Security Bureau, the local government's letters-and-visits office (信访), or the procuratorate (检察院) for more serious matters involving abuse of power. The national police supervision hotline is 12389.",
    "right_formal": "People's Police Law (supervision provisions)",
    "script": "我想就一名警察的行为提出投诉，请告诉我应该联系哪个部门。",
    "escalation": [
      "Call the national police supervision hotline 12389",
      "File a written complaint with the Public Security Bureau's supervision office (督察)",
      "For serious abuse of power, consider a complaint to the procuratorate (检察院)",
      "The letters-and-visits (信访) system is another formal channel for grievances",
      "Keep detailed written records, dates, and any evidence to support the complaint"
    ],
    "what_not_to_do": "Do not delay filing — some complaint channels have practical or procedural time sensitivities. Do not rely on a single channel; documenting through multiple official channels can help.",
    "source_statutes": [
      "People's Police Law"
    ],
    "severity": "medium"
  },
  {
    "id": "CN_FORCE_001_excessive_force",
    "country": "CN",
    "category": "USE_OF_FORCE",
    "sub_issue": "EXCESSIVE_FORCE",
    "trigger_keywords": [
      "警察打人",
      "police used excessive force",
      "injured by police",
      "暴力执法"
    ],
    "situation_description": "You experienced or witnessed what seemed like excessive use of force by police",
    "right_plain": "Police are only authorized to use force and police equipment within legally defined limits and circumstances. Excessive or unlawful use of force can be the basis for a complaint to the procuratorate or an administrative/state compensation claim in some circumstances.",
    "right_formal": "People's Police Law Art. 22 (prohibited conduct); State Compensation Law (for unlawful state action)",
    "script": "我需要就警察使用武力的情况进行记录，并寻求医疗和法律帮助。",
    "escalation": [
      "Seek medical attention and document injuries immediately with photos and medical records",
      "Get contact details of any witnesses",
      "File a complaint with the procuratorate or the police supervision office (督察)",
      "Consult a lawyer about a possible state compensation claim (国家赔偿)",
      "Call 12348 for legal aid guidance on the process"
    ],
    "what_not_to_do": "Do not delay medical treatment or documentation. Do not discard damaged clothing or other physical evidence.",
    "source_statutes": [
      "People's Police Law Art. 22",
      "State Compensation Law"
    ],
    "severity": "critical"
  },
  {
    "id": "CN_MINOR_001_juvenile_rights",
    "country": "CN",
    "category": "MINORS_RIGHTS",
    "sub_issue": "MINOR_ENCOUNTER",
    "trigger_keywords": [
      "未成年人被警察询问",
      "minor questioned by police",
      "juvenile rights",
      "my child was detained"
    ],
    "situation_description": "A minor (under 18) is questioned, summoned, or detained by police",
    "right_plain": "When police question a minor suspect or witness, a guardian or appropriate adult representative should generally be notified and present. Special protections apply to how minors are questioned, detained, and processed compared to adults, reflecting a stated legal policy of education and rehabilitation over punishment for minors where possible.",
    "right_formal": "Law on the Protection of Minors; Criminal Procedure Law (special procedures for minors)",
    "script": "这是未成年人，请通知监护人到场后再进行询问。",
    "escalation": [
      "Insist that a guardian or appropriate adult be present before questioning proceeds",
      "Ask for the specific legal basis for any detention of a minor",
      "Retain a lawyer experienced in juvenile cases as early as possible",
      "Contact 12348 for legal aid, which often prioritizes minors' cases",
      "Keep the guardian informed and involved at every stage"
    ],
    "what_not_to_do": "Do not allow a minor to be questioned alone without a guardian present if it can be avoided. Do not let a minor sign statements without a guardian and, where possible, a lawyer reviewing them.",
    "source_statutes": [
      "Law on the Protection of Minors",
      "Criminal Procedure Law"
    ],
    "severity": "critical"
  },
  {
    "id": "CN_RECORD_001_filming_police",
    "country": "CN",
    "category": "RECORDING_POLICE",
    "sub_issue": "RIGHT_TO_FILM",
    "trigger_keywords": [
      "拍摄警察",
      "recording police",
      "filming police interaction",
      "can I film this"
    ],
    "situation_description": "You want to record a police interaction, or an officer is telling you to stop",
    "right_plain": "There is no clearly defined, broad legal right to record police in China the way there is in some other countries, and officers may ask you to stop, especially in sensitive situations. In practice this varies significantly and can carry real risk depending on context. If you choose to record, do so discreetly and avoid physically interfering with the officer's duties.",
    "right_formal": "No specific statutory right; general public order and obstruction provisions may be invoked by police in practice",
    "script": "我没有妨碍您执行公务，只是想记录当前情况。",
    "escalation": [
      "Understand this carries genuine practical risk and varies by situation",
      "Avoid confrontation if asked to stop",
      "If your device is taken, ask for a receipt and note the officers' details",
      "Consult a lawyer afterward about any recording that was confiscated or deleted",
      "Consider whether recording is the safest way to document the situation in your specific circumstances"
    ],
    "what_not_to_do": "Do not argue extensively with an officer about your right to record — the legal ground here is much less settled than for other rights in this list. Do not physically resist if a device is taken.",
    "source_statutes": [
      "No specific statutory right"
    ],
    "severity": "high"
  },
  {
    "id": "CN_HOUSEHOLD_001_residence_permit",
    "country": "CN",
    "category": "HOUSEHOLD_REGISTRATION",
    "sub_issue": "RESIDENCE_PERMIT_CHECK",
    "trigger_keywords": [
      "居住证检查",
      "residence permit check",
      "temporary residence",
      "暂住证"
    ],
    "situation_description": "Police or a residential community check ask about your household registration (户口) or residence permit (居住证) status, common for internal migrants",
    "right_plain": "People living outside their registered household registration (户口) location for an extended period are generally expected to register for a residence permit (居住证) with local authorities. Lacking one is typically an administrative matter, not a criminal one, though it can affect access to some local services.",
    "right_formal": "Regulations on Residence Permits (居住证暂行条例)",
    "script": "请问登记居住证需要准备哪些材料？我会尽快去办理。",
    "escalation": [
      "Ask what documents are needed to register",
      "Visit the local police station (派出所) or community service center to register",
      "Keep proof that you have applied if the process is ongoing",
      "If facing difficulty accessing services without a permit, community legal aid (12348) can advise on your specific situation",
      "This is generally an administrative registration matter, not grounds for detention on its own"
    ],
    "what_not_to_do": "Do not ignore repeated notices to register — resolve it proactively to avoid complications. Do not provide false registration information.",
    "source_statutes": [
      "Regulations on Residence Permits"
    ],
    "severity": "low"
  },
  {
    "id": "CN_BAIL_001_qubao_houshen",
    "country": "CN",
    "category": "ARREST",
    "sub_issue": "BAIL_PENDING_TRIAL",
    "trigger_keywords": [
      "取保候审",
      "bail pending trial",
      "release on guarantee",
      "released while case continues"
    ],
    "situation_description": "You or a family member wants to seek release pending trial (取保候审) instead of continued detention",
    "right_plain": "Release on guarantee pending trial is available in certain circumstances — for example when the potential sentence is relatively minor, the person poses no danger to society, or for health reasons such as serious illness or pregnancy. It generally requires providing a guarantor (保证人) or a financial guarantee (保证金), with conditions such as not leaving the city without permission.",
    "right_formal": "Criminal Procedure Law Art. 67-71",
    "script": "我想申请取保候审，请说明所需的条件和材料。",
    "escalation": [
      "Have your lawyer formally apply for release pending trial",
      "Gather documentation supporting eligibility (health condition, minor nature of alleged offence, stable residence, etc.)",
      "Identify a suitable guarantor or arrange the financial guarantee if required",
      "Understand and follow the conditions strictly once released — violating them can lead to re-detention",
      "Keep in regular contact with your lawyer about the case's progress while released"
    ],
    "what_not_to_do": "Do not leave the designated city/area or otherwise violate release conditions. Do not assume release pending trial means the case is resolved — it is not an acquittal.",
    "source_statutes": [
      "Criminal Procedure Law Art. 67-71"
    ],
    "severity": "high"
  }
] as const;
