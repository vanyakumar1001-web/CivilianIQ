export const entries = [
  {
    "id": "RU_ID_001_document_check",
    "country": "RU",
    "category": "ID_CHECK",
    "sub_issue": "DOCUMENT_CHECK",
    "trigger_keywords": [
      "проверка документов",
      "check my documents",
      "id check",
      "police stopped me",
      "полиция остановила"
    ],
    "situation_description": "Police stop you and ask to check your identity documents (паспорт)",
    "right_plain": "Police may check your documents when they have specific grounds under the Police Law (e.g. suspicion of an offence, matching a wanted person's description, or in a designated security zone). You can ask the officer to identify themselves, show their service ID, and state the reason for the check.",
    "right_formal": "Federal Law 'On the Police' Art. 5, Art. 13",
    "script": "Здравствуйте, представьтесь, пожалуйста, и покажите служебное удостоверение. Объясните причину проверки. Вот мои документы.",
    "escalation": [
      "Ask the officer to identify themselves and show their service ID",
      "Ask for the specific reason for the check",
      "Comply by showing your documents",
      "Note the officer's name, badge number, and department",
      "If you believe the check was unlawful, you can file a complaint with the police department or the Prosecutor's Office (прокуратура)"
    ],
    "what_not_to_do": "Do not refuse to show documents once a lawful reason is given. Do not physically resist even if you disagree — raise concerns afterward through a complaint.",
    "source_statutes": [
      "Federal Law 'On the Police' Art. 5",
      "Art. 13"
    ],
    "severity": "low"
  },
  {
    "id": "RU_TRAFFIC_001_documents",
    "country": "RU",
    "category": "TRAFFIC_STOP",
    "sub_issue": "REQUIRED_DOCUMENTS",
    "trigger_keywords": [
      "гаишники остановили",
      "traffic police stopped me",
      "ДПС",
      "водительские права"
    ],
    "situation_description": "Traffic police (ГИБДД/ДПС) stop your vehicle and ask for documents",
    "right_plain": "You must show your driving licence, vehicle registration, and insurance (ОСАГО) when asked during a lawful traffic stop. You are entitled to know the reason for the stop, and traffic officers must identify themselves.",
    "right_formal": "Traffic Police Administrative Regulations; Federal Law 'On the Police' Art. 5",
    "script": "Здравствуйте, представьтесь, пожалуйста, и объясните причину остановки. Вот мои документы.",
    "escalation": [
      "Ask for the specific reason for the stop",
      "Provide the required documents calmly",
      "Note the officer's name and badge number if you plan to dispute a penalty",
      "A disputed fine can generally be appealed within 10 days to a superior officer, the court, or the Prosecutor's Office",
      "Keep a copy or photo of any protocol (протокол) issued"
    ],
    "what_not_to_do": "Do not argue extensively at the roadside about a disputed fine — appeal it through the proper process afterward. Do not drive away before being told you may leave.",
    "source_statutes": [
      "Federal Law 'On the Police' Art. 5"
    ],
    "severity": "low"
  },
  {
    "id": "RU_DETAIN_001_criminal",
    "country": "RU",
    "category": "DETENTION",
    "sub_issue": "ZADERZHANIE",
    "trigger_keywords": [
      "задержание",
      "detained by police",
      "police detained me",
      "меня задержали"
    ],
    "situation_description": "You are detained (задержание) on suspicion of a crime",
    "right_plain": "Criminal detention can generally last up to 48 hours before a court must decide whether to authorize pre-trial detention (заключение под стражу) or release. A detention protocol (протокол задержания) must be drawn up within 3 hours of you being brought to the police station, and relatives must generally be notified within 12 hours.",
    "right_formal": "Code of Criminal Procedure (УПК РФ) Art. 91-96",
    "script": "Прошу составить протокол задержания и уведомить моих родственников. Я хочу воспользоваться правом на защитника.",
    "escalation": [
      "Ask to see the detention protocol",
      "Ask that relatives be notified within the 12-hour window",
      "Invoke your right to a defense lawyer immediately",
      "Track the 48-hour deadline for a court decision",
      "If the deadline is exceeded without a documented legal reason, this can be raised with the Prosecutor's Office"
    ],
    "what_not_to_do": "Do not sign the detention protocol or any statement without reading it carefully, ideally with a lawyer. Do not assume things will resolve on their own — actively track the legal deadlines.",
    "source_statutes": [
      "Code of Criminal Procedure Art. 91-96"
    ],
    "severity": "critical"
  },
  {
    "id": "RU_DETAIN_002_administrative",
    "country": "RU",
    "category": "ADMINISTRATIVE_DETENTION",
    "sub_issue": "ADMIN_ZADERZHANIE",
    "trigger_keywords": [
      "административное задержание",
      "administrative detention",
      "detained for administrative offence"
    ],
    "situation_description": "You are placed under administrative detention (административное задержание) for a minor offence, not a crime",
    "right_plain": "Administrative detention generally lasts up to 3 hours, though it can extend up to 48 hours for certain offences (e.g. those that could lead to administrative arrest). You have the right to know the grounds for detention, to have relatives notified, and to appeal the detention.",
    "right_formal": "Code of Administrative Offences (КоАП РФ) Art. 27.3-27.5",
    "script": "Прошу объяснить основание для моего задержания и уведомить родственников.",
    "escalation": [
      "Ask for the specific grounds cited for the detention",
      "Ask that relatives be notified",
      "Note the exact time detention began — the clock on the time limit starts then",
      "You can appeal the detention to a court or the Prosecutor's Office",
      "Consult a lawyer if the detention is prolonged without clear cause"
    ],
    "what_not_to_do": "Do not sign an administrative protocol you disagree with without noting your objection in writing on the document itself if possible.",
    "source_statutes": [
      "Code of Administrative Offences Art. 27.3-27.5"
    ],
    "severity": "high"
  },
  {
    "id": "RU_INTERROGATION_001_self_incrimination",
    "country": "RU",
    "category": "INTERROGATION",
    "sub_issue": "RIGHT_AGAINST_COMPULSION",
    "trigger_keywords": [
      "допрос",
      "interrogation",
      "do i have to answer",
      "право на молчание"
    ],
    "situation_description": "You are being questioned or interrogated by police",
    "right_plain": "The Constitution gives everyone the right not to testify against themselves, their spouse, or close relatives. You are not obligated to answer questions that would incriminate you or those close relatives, and you can invoke this right at any point.",
    "right_formal": "Constitution of the Russian Federation Art. 51; Code of Criminal Procedure Art. 46-47",
    "script": "Я хочу воспользоваться статьёй 51 Конституции и не давать показания без адвоката.",
    "escalation": [
      "Clearly state you are invoking Article 51 of the Constitution",
      "Ask for a lawyer before continuing to answer questions",
      "Do not sign a statement (протокол допроса) without reading it fully, ideally with a lawyer",
      "You can request the questioning stop until your lawyer arrives",
      "Contact a lawyer or legal aid organization as early as possible"
    ],
    "what_not_to_do": "Do not assume that answering 'just a little' is safe — once you start talking, everything said can be used. Do not sign anything you have not read and understood.",
    "source_statutes": [
      "Constitution Art. 51",
      "Code of Criminal Procedure Art. 46-47"
    ],
    "severity": "critical"
  },
  {
    "id": "RU_LEGAL_AID_001_right_to_lawyer",
    "country": "RU",
    "category": "LEGAL_AID",
    "sub_issue": "RIGHT_TO_COUNSEL",
    "trigger_keywords": [
      "мне нужен адвокат",
      "i want a lawyer",
      "legal aid",
      "право на защитника"
    ],
    "situation_description": "You or a family member wants to retain a defense lawyer (адвокат)",
    "right_plain": "You have the right to a defense lawyer from the moment of actual detention, arrest, or the start of any procedural action affecting your rights, not just from a formal charge. If you cannot afford one, a lawyer can be appointed by the state (назначенный защитник), though many people prefer to independently verify the appointed lawyer's engagement given documented quality concerns with some appointed defenders.",
    "right_formal": "Code of Criminal Procedure Art. 16, Art. 49-51; Constitution Art. 48",
    "script": "Я хочу воспользоваться правом на защитника. Прошу уведомить моих родственников, чтобы они могли пригласить адвоката.",
    "escalation": [
      "State clearly that you want a lawyer before answering further questions",
      "Ask that family be notified so they can retain an independent lawyer",
      "If a state-appointed lawyer is provided, family can still separately retain an independent one",
      "Contact a legal aid organization or bar association referral service for help finding a lawyer",
      "Keep the lawyer's contact information and any case/protocol numbers for follow-up"
    ],
    "what_not_to_do": "Do not proceed with questioning without a lawyer present if you can avoid it, especially in a serious matter. Do not assume a lawyer's presence is a formality — an engaged lawyer meaningfully changes the process.",
    "source_statutes": [
      "Code of Criminal Procedure Art. 16",
      "Art. 49-51",
      "Constitution Art. 48"
    ],
    "severity": "high"
  },
  {
    "id": "RU_SEARCH_001_home_search",
    "country": "RU",
    "category": "SEARCH",
    "sub_issue": "HOME_SEARCH",
    "trigger_keywords": [
      "обыск",
      "search my home",
      "police searching house",
      "постановление на обыск"
    ],
    "situation_description": "Police want to search your home",
    "right_plain": "The home is constitutionally protected, and a search (обыск) generally requires a court order (судебное решение), except in narrowly defined urgent circumstances where a search can proceed and then be reported to a judge within 24 hours for a legality review. You can ask to see the court order before the search proceeds, and two independent witnesses (понятые) should generally be present.",
    "right_formal": "Constitution Art. 25; Code of Criminal Procedure Art. 12, Art. 182",
    "script": "Прошу предъявить постановление суда на обыск.",
    "escalation": [
      "Ask to see the court order before allowing the search",
      "Note the names of officers and witnesses present",
      "Ask for a copy of the search protocol (протокол обыска) listing everything taken",
      "Contact a lawyer as soon as possible afterward",
      "A search conducted without proper legal basis can be challenged in court"
    ],
    "what_not_to_do": "Do not physically obstruct a search even if you believe it is improper — object verbally, document the details, and challenge it through a lawyer afterward.",
    "source_statutes": [
      "Constitution Art. 25",
      "Code of Criminal Procedure Art. 12",
      "Art. 182"
    ],
    "severity": "critical"
  },
  {
    "id": "RU_SEARCH_002_personal_search",
    "country": "RU",
    "category": "SEARCH",
    "sub_issue": "PERSONAL_SEARCH",
    "trigger_keywords": [
      "личный досмотр",
      "personal search",
      "pat down",
      "search my bag"
    ],
    "situation_description": "Police want to conduct a personal search (личный досмотр) of you or your belongings",
    "right_plain": "A personal search generally requires a specific legal basis (such as being detained, or reasonable suspicion of carrying prohibited items) and should be conducted by an officer of the same sex, with two witnesses present, and a protocol drawn up documenting what occurred.",
    "right_formal": "Code of Administrative Offences Art. 27.7",
    "script": "На каком основании проводится личный досмотр? Прошу присутствия понятых и составления протокола.",
    "escalation": [
      "Ask for the legal basis for the search",
      "Ask that the protocol document everything found",
      "Note the officers' and witnesses' names",
      "Request a copy of the protocol",
      "Consult a lawyer afterward if you believe the search was improper"
    ],
    "what_not_to_do": "Do not physically resist a search being conducted by police — object verbally and follow up through the proper channels afterward.",
    "source_statutes": [
      "Code of Administrative Offences Art. 27.7"
    ],
    "severity": "medium"
  },
  {
    "id": "RU_COMPLAINT_001_misconduct",
    "country": "RU",
    "category": "FILING_COMPLAINT",
    "sub_issue": "POLICE_MISCONDUCT",
    "trigger_keywords": [
      "жалоба на полицию",
      "file a complaint against police",
      "police misconduct",
      "прокуратура"
    ],
    "situation_description": "You want to file a complaint about police misconduct",
    "right_plain": "Complaints about police conduct can be filed with the police department's internal affairs unit (собственная безопасность), the Prosecutor's Office (прокуратура), or, for serious crimes by officials, the Investigative Committee (Следственный комитет). Complaints can generally be submitted in writing, online, or in person.",
    "right_formal": "Federal Law 'On the Police' Art. 53",
    "script": "Я хочу подать жалобу на действия сотрудника полиции. Подскажите, куда мне обратиться.",
    "escalation": [
      "File a written complaint with the police department's internal affairs unit",
      "File a complaint with the Prosecutor's Office, which supervises the legality of police actions",
      "For serious abuse of power or violence, consider the Investigative Committee",
      "Keep detailed written records, dates, and any evidence to support the complaint",
      "A lawyer or human rights organization can help draft and route the complaint"
    ],
    "what_not_to_do": "Do not delay filing — gather evidence and file while details are fresh. Do not rely on a single channel; documenting through multiple official channels can help.",
    "source_statutes": [
      "Federal Law 'On the Police' Art. 53"
    ],
    "severity": "medium"
  },
  {
    "id": "RU_FORCE_001_excessive_force",
    "country": "RU",
    "category": "USE_OF_FORCE",
    "sub_issue": "EXCESSIVE_FORCE",
    "trigger_keywords": [
      "избили полицейские",
      "police used excessive force",
      "injured by police",
      "применение силы"
    ],
    "situation_description": "You experienced or witnessed what seemed like excessive use of force by police",
    "right_plain": "Police may only use physical force, special equipment, or firearms within legally defined limits and circumstances, and must try to minimize harm. Excessive or unlawful force can be the basis for a complaint to the Prosecutor's Office or the Investigative Committee, and for a civil claim for damages.",
    "right_formal": "Federal Law 'On the Police' Chapter 5, Art. 18-24",
    "script": "Мне нужно зафиксировать применение силы сотрудником полиции и обратиться за медицинской и юридической помощью.",
    "escalation": [
      "Seek medical attention and document injuries immediately with photos and medical records",
      "Get contact details of any witnesses",
      "File a complaint with the Investigative Committee or Prosecutor's Office",
      "Consult a lawyer about a civil claim for damages",
      "Contact a human rights organization for support with the process"
    ],
    "what_not_to_do": "Do not delay medical treatment or documentation. Do not discard damaged clothing or other physical evidence.",
    "source_statutes": [
      "Federal Law 'On the Police' Chapter 5"
    ],
    "severity": "critical"
  },
  {
    "id": "RU_PROTEST_001_assembly_rights",
    "country": "RU",
    "category": "PROTEST_RIGHTS",
    "sub_issue": "PEACEFUL_ASSEMBLY",
    "trigger_keywords": [
      "митинг",
      "protest rights",
      "demonstration",
      "police at protest",
      "несанкционированная акция"
    ],
    "situation_description": "You are participating in or near a public assembly, rally, or protest",
    "right_plain": "The Constitution formally protects the right to peaceful assembly, but Russian law requires advance notification or authorization for most public gatherings, and enforcement in practice has been documented by human rights organizations as considerably more restrictive than the formal text suggests — including detentions at gatherings that have not been formally authorized. Understanding the practical risk in your specific city and situation matters as much as the formal law.",
    "right_formal": "Constitution Art. 31; Federal Law on Assemblies, Meetings, Demonstrations, Marches and Picketing",
    "script": "Я нахожусь здесь мирно. На каком основании вы просите меня уйти или задерживаете меня?",
    "escalation": [
      "Understand the practical risk before attending an unauthorized gathering",
      "If told to disperse, weigh the risk of continued presence carefully",
      "If detained, ask for the specific grounds and invoke Article 51 and your right to a lawyer",
      "Document the situation safely if possible",
      "Contact a lawyer or human rights organization experienced with protest-related cases"
    ],
    "what_not_to_do": "Do not assume the formal constitutional right alone protects you from detention at an unauthorized gathering — the practical situation is genuinely different from the formal text. Do not engage in physical confrontation.",
    "source_statutes": [
      "Constitution Art. 31",
      "Federal Law on Assemblies"
    ],
    "severity": "critical"
  },
  {
    "id": "RU_RECORD_001_filming_police",
    "country": "RU",
    "category": "RECORDING_POLICE",
    "sub_issue": "RIGHT_TO_FILM",
    "trigger_keywords": [
      "снимать полицию на видео",
      "recording police",
      "filming police interaction",
      "can i film this"
    ],
    "situation_description": "You want to record a police interaction, or an officer is telling you to stop",
    "right_plain": "There is no single clear statutory right to record police the way there is in some other countries, though recording in public places is generally not itself prohibited. Officers may ask you to stop, and how this plays out in practice varies significantly by situation and location. If you choose to record, avoid physically interfering with the officer's duties.",
    "right_formal": "No specific statutory right; general public order provisions may be invoked by police in practice",
    "script": "Я не мешаю вашей работе, я лишь фиксирую происходящее.",
    "escalation": [
      "Understand this carries genuine practical risk and varies by situation",
      "Avoid confrontation if asked to stop",
      "If your device is taken, ask for a receipt and note the officers' details",
      "Consult a lawyer afterward about any recording that was confiscated or deleted",
      "Consider whether recording is the safest way to document your specific situation"
    ],
    "what_not_to_do": "Do not argue extensively with an officer about a right to record — the legal ground here is much less settled than for other rights in this list. Do not physically resist if a device is taken.",
    "source_statutes": [
      "No specific statutory right"
    ],
    "severity": "high"
  },
  {
    "id": "RU_MIGRATION_001_registration",
    "country": "RU",
    "category": "MIGRATION_REGISTRATION",
    "sub_issue": "MIGRATION_REGISTRATION_CHECK",
    "trigger_keywords": [
      "миграционный учет",
      "migration registration",
      "regisration check",
      "виза проверка"
    ],
    "situation_description": "Police check your migration registration (миграционный учёт) or visa status as a foreign citizen",
    "right_plain": "Foreign citizens are generally required to register their place of stay within a set period after arrival (commonly 7-90 days depending on circumstances and region). Lacking valid registration is typically an administrative matter that can lead to a fine or, in more serious cases, administrative expulsion, rather than being treated as a crime on its own.",
    "right_formal": "Federal Law on Migration Registration of Foreign Citizens",
    "script": "Вот мои документы. Подскажите, пожалуйста, что нужно сделать для решения вопроса с регистрацией.",
    "escalation": [
      "Show your passport, visa, and migration card if you have them",
      "Ask what specifically needs to be corrected",
      "Contact your embassy or consulate if the situation is serious",
      "Seek legal aid or a migration lawyer for guidance specific to your situation",
      "Resolve registration issues proactively rather than waiting for a check"
    ],
    "what_not_to_do": "Do not ignore registration requirements — resolve them proactively. Do not provide false information about your registration status.",
    "source_statutes": [
      "Federal Law on Migration Registration of Foreign Citizens"
    ],
    "severity": "medium"
  },
  {
    "id": "RU_RESTRAINT_001_measures",
    "country": "RU",
    "category": "RESTRAINT_MEASURES",
    "sub_issue": "MERA_PRESECHENIYA",
    "trigger_keywords": [
      "мера пресечения",
      "restraint measure",
      "house arrest",
      "домашний арест",
      "подписка о невыезде"
    ],
    "situation_description": "A court is deciding on a restraint measure (мера пресечения) while your criminal case continues",
    "right_plain": "Restraint measures range from the least restrictive (a written undertaking not to leave — подписка о невыезде) to house arrest (домашний арест), bail (залог), and pre-trial detention (заключение под стражу). Courts are formally required to consider less restrictive measures before ordering detention, though in practice pre-trial detention is requested and granted often — your lawyer's arguments at this hearing matter a great deal.",
    "right_formal": "Code of Criminal Procedure Art. 97-110",
    "script": "Прошу суд рассмотреть менее строгую меру пресечения с учётом моих обстоятельств.",
    "escalation": [
      "Have your lawyer prepare arguments for a less restrictive measure (stable residence, employment, family ties, health)",
      "Gather documentation supporting your case (work, residence registration, family, health records)",
      "Understand the specific conditions of whichever measure is ordered and follow them strictly",
      "A restraint measure can generally be appealed to a higher court",
      "Stay in close contact with your lawyer as the case proceeds"
    ],
    "what_not_to_do": "Do not violate the conditions of a restraint measure once ordered — this can lead to a stricter measure. Do not assume a lighter measure means the case is resolved.",
    "source_statutes": [
      "Code of Criminal Procedure Art. 97-110"
    ],
    "severity": "critical"
  },
  {
    "id": "RU_INTERPRETER_001_right_to_interpreter",
    "country": "RU",
    "category": "INTERPRETER_RIGHTS",
    "sub_issue": "RIGHT_TO_INTERPRETER",
    "trigger_keywords": [
      "мне нужен переводчик",
      "i need an interpreter",
      "don't speak russian well",
      "право на переводчика"
    ],
    "situation_description": "You do not speak Russian well and are involved in a police or legal process",
    "right_plain": "If you do not sufficiently understand Russian, you have the right to a free interpreter for all procedural actions, and to receive key documents in a language you understand. This applies to questioning, detention paperwork, and court proceedings.",
    "right_formal": "Code of Criminal Procedure Art. 18",
    "script": "Я не говорю по-русски достаточно хорошо. Прошу предоставить переводчика.",
    "escalation": [
      "State clearly that you need an interpreter before continuing",
      "Do not sign documents you cannot read and understand",
      "Ask for key documents to be provided in a language you understand",
      "Contact your embassy or consulate if you are a foreign national",
      "A lawyer can help ensure this right is respected throughout the process"
    ],
    "what_not_to_do": "Do not proceed with questioning or sign documents without an interpreter if you do not fully understand what is being said. Do not rely on an informal, unofficial interpreter for important procedural steps.",
    "source_statutes": [
      "Code of Criminal Procedure Art. 18"
    ],
    "severity": "high"
  },
  {
    "id": "RU_ARREST_001_notification",
    "country": "RU",
    "category": "ARREST",
    "sub_issue": "FAMILY_NOTIFICATION",
    "trigger_keywords": [
      "уведомление родственников",
      "notify my family",
      "family notification detention",
      "право на звонок"
    ],
    "situation_description": "You want your family or someone else to be notified that you have been detained",
    "right_plain": "When you are detained, the investigator or officer must generally notify a close relative within 12 hours (with narrow exceptions, such as when the investigation would be seriously hindered — and even then, the prosecutor must be notified). You can request notification of a specific person.",
    "right_formal": "Code of Criminal Procedure Art. 96",
    "script": "Прошу уведомить моих родственников о моём задержании в установленный законом срок.",
    "escalation": [
      "Clearly request notification of a specific relative or contact",
      "Ask for confirmation that notification was made",
      "If notification is delayed without explanation, a lawyer can raise this with the Prosecutor's Office",
      "Keep track of the time detention began to verify the 12-hour window",
      "Family should proactively ask the police station or Prosecutor's Office if they suspect a detention"
    ],
    "what_not_to_do": "Do not assume notification happened automatically — actively confirm it. Do not wait passively if the deadline has clearly passed.",
    "source_statutes": [
      "Code of Criminal Procedure Art. 96"
    ],
    "severity": "high"
  }
] as const;
