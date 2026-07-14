export const entries = [
  {
    "id": "US_TRAFFIC_001_documents",
    "country": "US",
    "category": "TRAFFIC_STOP",
    "sub_issue": "REQUIRED_DOCUMENTS",
    "trigger_keywords": [
      "pulled over",
      "traffic stop",
      "speeding",
      "license",
      "registration",
      "cop stopped me"
    ],
    "situation_description": "Police pulled you over during a traffic stop",
    "right_plain": "You must provide your driver's license, vehicle registration, and proof of insurance when asked. You are not required to answer questions about where you're going or what you're doing, but you must comply with document requests.",
    "right_formal": "State traffic codes generally require license/registration production; 4th Amendment governs the scope of the stop",
    "script": "Officer, here is my license, registration, and insurance. Am I free to go, or am I being detained?",
    "escalation": [
      "Stay calm, keep hands visible",
      "Provide only the required documents",
      "Ask if you are free to leave",
      "Note the officer's name/badge number if concerned",
      "File a complaint with the department afterward if needed"
    ],
    "what_not_to_do": "Do not reach for documents without telling the officer first. Do not argue at the scene. Do not physically resist.",
    "source_statutes": [
      "State vehicle codes",
      "4th Amendment",
      "Pennsylvania v. Mimms 1977"
    ],
    "severity": "low"
  },
  {
    "id": "US_TRAFFIC_002_phone_search",
    "country": "US",
    "category": "TRAFFIC_STOP",
    "sub_issue": "DEVICE_SEARCH",
    "trigger_keywords": [
      "unlock my phone",
      "search my phone",
      "show me your phone",
      "phone search traffic stop"
    ],
    "situation_description": "Officer asks you to unlock or hand over your phone during a traffic stop",
    "right_plain": "Police need a warrant to search the contents of your phone, even during a lawful traffic stop or arrest. You can refuse to unlock it or provide your passcode.",
    "right_formal": "4th Amendment protection against unreasonable searches, extended to digital devices",
    "script": "Officer, I do not consent to a search of my phone. My phone is protected under the 4th Amendment, and you would need a warrant to search its contents.",
    "escalation": [
      "Clearly state you do not consent",
      "Do not provide your passcode",
      "If phone is seized, ask for a property receipt",
      "Contact a lawyer as soon as possible",
      "Note that refusal alone is not probable cause for arrest"
    ],
    "what_not_to_do": "Do not unlock the phone under pressure. Do not delete anything. Do not physically resist if they seize it — object verbally and follow up legally instead.",
    "source_statutes": [
      "4th Amendment",
      "Riley v. California 2014"
    ],
    "severity": "high"
  },
  {
    "id": "US_TRAFFIC_003_exit_vehicle",
    "country": "US",
    "category": "TRAFFIC_STOP",
    "sub_issue": "EXIT_ORDER",
    "trigger_keywords": [
      "get out of the car",
      "step out of the vehicle",
      "exit the car"
    ],
    "situation_description": "Officer orders you (or a passenger) to step out of the vehicle during a stop",
    "right_plain": "During a lawful traffic stop, an officer CAN legally order you and passengers out of the vehicle, even without additional suspicion. This is different from being searched or arrested.",
    "right_formal": "Officer safety exception recognized by the Supreme Court",
    "script": "Okay, I'm stepping out now. I want to be clear I am not consenting to any search of my person or vehicle.",
    "escalation": [
      "Comply with the exit order calmly",
      "State clearly you don't consent to a search",
      "Keep hands visible at all times",
      "Ask if you are under arrest",
      "Document details afterward"
    ],
    "what_not_to_do": "Do not refuse to exit the vehicle — this order is legal and refusing can lead to arrest. Do not make sudden movements.",
    "source_statutes": [
      "Pennsylvania v. Mimms 1977",
      "4th Amendment"
    ],
    "severity": "low"
  },
  {
    "id": "US_VEHICLE_001_search_consent",
    "country": "US",
    "category": "VEHICLE_SEARCH",
    "sub_issue": "CONSENT_SEARCH",
    "trigger_keywords": [
      "search my car",
      "search the vehicle",
      "mind if I look in your trunk",
      "can I search your car"
    ],
    "situation_description": "Officer asks for permission to search your car without a warrant",
    "right_plain": "You have the right to refuse a search of your vehicle if the officer does not have a warrant or probable cause. Simply saying no does not give them cause to search anyway — but they may still search if they claim probable cause exists.",
    "right_formal": "4th Amendment; warrantless searches require consent, probable cause, or a recognized exception",
    "script": "Officer, I do not consent to a search of my vehicle.",
    "escalation": [
      "Say clearly and calmly that you do not consent",
      "Do not physically block or interfere if they search anyway",
      "Note that you objected, for later legal use",
      "Ask for a lawyer if detained further",
      "A wrongful search can be challenged in court later even if it already happened"
    ],
    "what_not_to_do": "Do not consent even informally ('I guess that's fine'). Do not physically resist if they proceed anyway — object verbally, not physically.",
    "source_statutes": [
      "4th Amendment",
      "Schneckloth v. Bustamonte 1973"
    ],
    "severity": "medium"
  },
  {
    "id": "US_VEHICLE_002_k9_sniff",
    "country": "US",
    "category": "VEHICLE_SEARCH",
    "sub_issue": "K9_UNIT",
    "trigger_keywords": [
      "drug dog",
      "k9 unit",
      "dog sniff",
      "canine search"
    ],
    "situation_description": "Police want to bring a K9 unit to sniff your car during a stop",
    "right_plain": "Police cannot extend the length of a routine traffic stop just to wait for or conduct a K9 sniff, unless they have independent reasonable suspicion. A stop can only last as long as necessary to handle the traffic violation itself.",
    "right_formal": "4th Amendment — unreasonable seizure via prolonged detention",
    "script": "Officer, am I free to go? I don't believe you have grounds to extend this stop for a K9 search.",
    "escalation": [
      "Ask directly if you're free to leave",
      "Note the time the stop started and how long it's taking",
      "Do not consent to the extended wait",
      "Contact a lawyer afterward if the stop was significantly prolonged",
      "This can be challenged in court even after the fact"
    ],
    "what_not_to_do": "Do not argue extensively at the scene — note details and raise the issue with a lawyer afterward instead.",
    "source_statutes": [
      "Rodriguez v. United States 2015",
      "4th Amendment"
    ],
    "severity": "medium"
  },
  {
    "id": "US_STOP_001_id_general",
    "country": "US",
    "category": "STOP_AND_ID",
    "sub_issue": "ID_REQUEST",
    "trigger_keywords": [
      "show me your id",
      "what's your name",
      "identify yourself",
      "papers please"
    ],
    "situation_description": "Police stop you on the street and ask for identification",
    "right_plain": "Whether you must show ID depends on your state. In 'stop and identify' states, you must state your name if lawfully detained with reasonable suspicion. In other states, you are not required to identify yourself unless you are being arrested. You are generally never required to answer further questions.",
    "right_formal": "Varies by state 'stop and identify' statutes; 4th and 5th Amendment protections apply",
    "script": "Am I being detained, or am I free to go? What is the reason for this stop?",
    "escalation": [
      "Ask if you are being detained or are free to leave",
      "In stop-and-identify states, state your name if asked",
      "You can decline to answer further questions beyond identification",
      "Ask for a lawyer if detained further",
      "Note the encounter details for later"
    ],
    "what_not_to_do": "Do not provide false identification. Do not walk away if you are told you are being detained. Do not physically resist.",
    "source_statutes": [
      "Hiibel v. Sixth Judicial District Court 2004",
      "State stop-and-identify statutes"
    ],
    "severity": "medium"
  },
  {
    "id": "US_STOP_002_am_i_free",
    "country": "US",
    "category": "STOP_AND_ID",
    "sub_issue": "DETENTION_STATUS",
    "trigger_keywords": [
      "am i being detained",
      "am i free to go",
      "can i leave",
      "police talking to me on the street"
    ],
    "situation_description": "You want to know whether you are legally required to stay and talk to police",
    "right_plain": "You always have the right to ask whether you are being detained or are free to leave. If you are not detained, you can calmly walk away. If you are detained, the officer must have reasonable suspicion of a crime.",
    "right_formal": "4th Amendment — distinction between consensual encounter and investigative detention",
    "script": "Officer, am I being detained, or am I free to go?",
    "escalation": [
      "Ask directly and clearly",
      "If told you're free to go, calmly leave",
      "If detained, ask for the specific reason",
      "Do not argue about the reasonableness at the scene",
      "Consult a lawyer afterward if you believe the stop was unjustified"
    ],
    "what_not_to_do": "Do not run or make sudden movements — this itself can create reasonable suspicion. Do not ignore a clear order to stop.",
    "source_statutes": [
      "Terry v. Ohio 1968",
      "Illinois v. Wardlow 2000"
    ],
    "severity": "low"
  },
  {
    "id": "US_DETAIN_001_terry_stop",
    "country": "US",
    "category": "DETENTION",
    "sub_issue": "PAT_DOWN",
    "trigger_keywords": [
      "pat down",
      "frisk",
      "patted me down",
      "stop and frisk"
    ],
    "situation_description": "Police briefly detain and pat you down on suspicion of a crime",
    "right_plain": "Police can briefly detain you and pat down your outer clothing for weapons if they have reasonable, articulable suspicion that you are involved in criminal activity and may be armed. This is a limited search — it is not a full search of your body or belongings.",
    "right_formal": "Terry stop — reasonable suspicion standard, limited to weapons pat-down",
    "script": "I am not resisting, but I want it noted I do not consent to any search beyond a pat-down for weapons.",
    "escalation": [
      "Comply with the pat-down calmly",
      "State you do not consent to any further search",
      "Ask why you were stopped",
      "Note officer details for a later complaint if the stop felt unjustified",
      "Consult a lawyer if the pat-down went beyond a weapons check"
    ],
    "what_not_to_do": "Do not physically resist the pat-down itself — that can lead to additional charges. Object verbally, not physically.",
    "source_statutes": [
      "Terry v. Ohio 1968",
      "4th Amendment"
    ],
    "severity": "medium"
  },
  {
    "id": "US_ARREST_001_miranda",
    "country": "US",
    "category": "ARREST",
    "sub_issue": "MIRANDA_RIGHTS",
    "trigger_keywords": [
      "arrested",
      "you have the right to remain silent",
      "miranda rights",
      "taken into custody"
    ],
    "situation_description": "You are placed under arrest or taken into custody for questioning",
    "right_plain": "Once you are in custody and about to be questioned, police must inform you of your Miranda rights: the right to remain silent, that anything you say can be used against you, and the right to an attorney. If they don't read these rights before a custodial interrogation, statements you make may not be usable in court.",
    "right_formal": "5th and 6th Amendment protections during custodial interrogation",
    "script": "I am invoking my right to remain silent, and I want a lawyer. I will not answer questions without my attorney present.",
    "escalation": [
      "Clearly and verbally invoke your right to silence and to a lawyer",
      "Stop talking once you've invoked these rights",
      "Do not sign any statement without your lawyer",
      "Ask for the reason for arrest",
      "Contact a lawyer or public defender as soon as possible"
    ],
    "what_not_to_do": "Do not try to explain your side of the story without a lawyer present. Do not resist arrest even if you believe it's wrongful — challenge it in court instead.",
    "source_statutes": [
      "Miranda v. Arizona 1966",
      "5th Amendment",
      "6th Amendment"
    ],
    "severity": "critical"
  },
  {
    "id": "US_ARREST_002_right_to_remain_silent",
    "country": "US",
    "category": "ARREST",
    "sub_issue": "RIGHT_TO_SILENCE",
    "trigger_keywords": [
      "do i have to answer questions",
      "right to remain silent",
      "self incrimination",
      "interrogation"
    ],
    "situation_description": "Police are questioning you and you want to know if you must answer",
    "right_plain": "You have the right not to answer questions that could incriminate you, both during a stop and during formal interrogation. You must clearly and verbally state that you are invoking this right — staying silent without saying so may not fully protect you legally.",
    "right_formal": "5th Amendment protection against self-incrimination",
    "script": "I am invoking my 5th Amendment right to remain silent. I will not answer questions without my attorney.",
    "escalation": [
      "State clearly that you are invoking your right to remain silent",
      "Do not answer further questions after invoking",
      "Request a lawyer",
      "Do not explain or justify your silence further",
      "Wait for legal counsel before making any statement"
    ],
    "what_not_to_do": "Do not answer 'just one more question' after invoking silence. Do not assume silence alone (without stating it) fully protects you.",
    "source_statutes": [
      "5th Amendment",
      "Berghuis v. Thompkins 2010"
    ],
    "severity": "high"
  },
  {
    "id": "US_ARREST_003_right_to_attorney",
    "country": "US",
    "category": "ARREST",
    "sub_issue": "RIGHT_TO_COUNSEL",
    "trigger_keywords": [
      "i want a lawyer",
      "right to an attorney",
      "public defender",
      "can't afford a lawyer"
    ],
    "situation_description": "You are under arrest or being questioned and want legal representation",
    "right_plain": "You have the right to an attorney during questioning, and if you cannot afford one, the court must appoint one for you (a public defender) at no cost. Once you request a lawyer, police must stop questioning you until your lawyer is present.",
    "right_formal": "6th Amendment right to counsel",
    "script": "I want a lawyer. I am not answering any questions until my attorney is present.",
    "escalation": [
      "State clearly that you want an attorney",
      "Stop answering questions immediately after requesting one",
      "If you cannot afford a lawyer, ask for a public defender to be appointed",
      "Do not waive this right verbally under pressure",
      "Wait for your attorney before any further statements"
    ],
    "what_not_to_do": "Do not continue talking 'informally' after requesting a lawyer. Do not sign any waiver of this right without understanding it fully.",
    "source_statutes": [
      "6th Amendment",
      "Gideon v. Wainwright 1963",
      "Miranda v. Arizona 1966"
    ],
    "severity": "critical"
  },
  {
    "id": "US_ARREST_004_phone_call",
    "country": "US",
    "category": "ARREST",
    "sub_issue": "PHONE_CALL",
    "trigger_keywords": [
      "phone call after arrest",
      "can i call someone",
      "one phone call"
    ],
    "situation_description": "You've been arrested and want to contact someone",
    "right_plain": "Most states require that you be allowed a reasonable opportunity to make a phone call within a reasonable time after booking, though the exact rules vary by state and are not directly guaranteed by the U.S. Constitution itself.",
    "right_formal": "Varies by state statute; general due process considerations",
    "script": "I am requesting my phone call to contact my family or my attorney, as I understand I'm entitled to under state law.",
    "escalation": [
      "Ask clearly and calmly for your phone call",
      "Request to call a lawyer or family member",
      "Note the time of request if delayed unreasonably",
      "Raise any denial of this right with your attorney later",
      "File a complaint if this right was denied without reason"
    ],
    "what_not_to_do": "Do not become confrontational if there's a short delay — booking procedures take time. Do note excessive or unreasonable delays.",
    "source_statutes": [
      "State booking procedure statutes"
    ],
    "severity": "medium"
  },
  {
    "id": "US_HOME_001_warrant_search",
    "country": "US",
    "category": "HOME_SEARCH",
    "sub_issue": "WARRANTLESS_SEARCH",
    "trigger_keywords": [
      "search my house",
      "search warrant",
      "police at my door",
      "can they search my home"
    ],
    "situation_description": "Police want to search your home without a warrant",
    "right_plain": "Police generally need a warrant, signed by a judge, to search your home. You have the right to ask to see the warrant and to refuse entry if they don't have one, unless an exception applies (e.g., emergency, or someone with authority over the home consents).",
    "right_formal": "4th Amendment protection of the home, the highest level of constitutional protection",
    "script": "I do not consent to a search of my home. Do you have a warrant? If so, please slide it under the door or show it to me.",
    "escalation": [
      "Ask to see a warrant before allowing entry",
      "State clearly that you do not consent to a search",
      "Do not physically block officers if they enter anyway — object verbally",
      "Note the details for your attorney",
      "An improper search can be challenged in court, potentially excluding evidence found"
    ],
    "what_not_to_do": "Do not let anyone else in the household consent on your behalf without understanding the implications. Do not physically resist if they enter regardless.",
    "source_statutes": [
      "4th Amendment",
      "Mapp v. Ohio 1961",
      "Georgia v. Randolph 2006"
    ],
    "severity": "critical"
  },
  {
    "id": "US_HOME_002_knock_announce",
    "country": "US",
    "category": "HOME_SEARCH",
    "sub_issue": "KNOCK_AND_ANNOUNCE",
    "trigger_keywords": [
      "police banging on door",
      "no knock warrant",
      "police broke down my door"
    ],
    "situation_description": "Police arrive at your home suddenly, sometimes without announcing themselves",
    "right_plain": "Police are generally required to knock and announce their presence before entering, except under specific 'no-knock' warrants approved by a judge for safety reasons. If you believe an entry was unlawful, this can be challenged afterward through your attorney.",
    "right_formal": "4th Amendment reasonableness requirement; Wilson v. Arkansas 1995",
    "script": "I need to see the warrant. What is the reason for this entry?",
    "escalation": [
      "Stay calm and do not physically resist",
      "Ask to see the warrant once safe to do so",
      "Note the time and manner of entry",
      "Contact a lawyer immediately afterward",
      "An unlawful entry may be challenged in court later"
    ],
    "what_not_to_do": "Do not resist physically, even if you believe the entry is unlawful — your safety comes first; challenge it legally afterward.",
    "source_statutes": [
      "Wilson v. Arkansas 1995",
      "4th Amendment"
    ],
    "severity": "critical"
  },
  {
    "id": "US_RECORD_001_filming_police",
    "country": "US",
    "category": "RECORDING_POLICE",
    "sub_issue": "RIGHT_TO_FILM",
    "trigger_keywords": [
      "record police",
      "filming cop",
      "can i film the police",
      "delete my video"
    ],
    "situation_description": "You want to record police performing their duties in public, or they're telling you to stop",
    "right_plain": "You have a First Amendment right to record police performing their duties in public, as long as you don't physically interfere. Police cannot lawfully order you to stop recording or delete your footage without a warrant, in most federal circuits.",
    "right_formal": "1st Amendment right to record public officials",
    "script": "I have the right to record this from a safe distance under the First Amendment. I am not interfering with your duties.",
    "escalation": [
      "Continue recording calmly from a safe, non-interfering distance",
      "State clearly that you have a legal right to record",
      "Do not delete footage even if asked",
      "If your device is seized, ask for a property receipt and note officer details",
      "Contact a civil rights attorney or the ACLU if your rights were violated"
    ],
    "what_not_to_do": "Do not physically get in the officer's way while recording. Do not delete your recording under pressure. Note: some states have separate audio wiretapping laws that may apply to two-party consent for private conversations, not public police activity.",
    "source_statutes": [
      "1st Amendment",
      "Glik v. Cunniffe 2011"
    ],
    "severity": "medium"
  },
  {
    "id": "US_BAIL_001_bail_rights",
    "country": "US",
    "category": "BAIL_RIGHTS",
    "sub_issue": "EXCESSIVE_BAIL",
    "trigger_keywords": [
      "bail",
      "bail hearing",
      "how much is bail",
      "excessive bail"
    ],
    "situation_description": "You or a loved one has been arrested and bail is being set",
    "right_plain": "The 8th Amendment protects against 'excessive' bail, though it does not guarantee bail will always be granted — that depends on the alleged crime, flight risk, and other factors, determined at a bail hearing usually within 48-72 hours of arrest.",
    "right_formal": "8th Amendment; state bail procedures",
    "script": "I would like to request a bail hearing and to be informed of the amount and conditions as soon as possible.",
    "escalation": [
      "Request a prompt bail hearing",
      "Contact a lawyer or public defender to advocate at the hearing",
      "Gather documentation of community ties (job, family) which can help argue for lower bail",
      "Ask about bail bond services if bail is set high",
      "Challenge excessive bail through your attorney if it seems unreasonable for the alleged offense"
    ],
    "what_not_to_do": "Do not pay anyone claiming to guarantee release outside official bail bond processes. Do not miss your court date once released.",
    "source_statutes": [
      "8th Amendment",
      "State bail statutes"
    ],
    "severity": "high"
  },
  {
    "id": "US_COMPLAINT_001_misconduct",
    "country": "US",
    "category": "FILING_COMPLAINT",
    "sub_issue": "POLICE_MISCONDUCT",
    "trigger_keywords": [
      "file a complaint",
      "police misconduct",
      "report an officer",
      "internal affairs"
    ],
    "situation_description": "You want to file a complaint against an officer for misconduct",
    "right_plain": "You can file a complaint with the police department's Internal Affairs division, a civilian oversight board (if your city has one), or the DOJ Civil Rights Division for serious federal civil rights violations. Documentation (video, witness names, badge numbers) strengthens your complaint.",
    "right_formal": "Administrative complaint processes; 42 U.S.C. § 1983 civil rights claims",
    "script": "I would like to file a formal complaint regarding this officer's conduct during our encounter on [date].",
    "escalation": [
      "Document everything as soon as possible — names, badge numbers, time, location",
      "File with the department's Internal Affairs division",
      "File with a civilian oversight board if available in your city",
      "Contact a civil rights attorney about a potential Section 1983 claim",
      "Consider contacting the ACLU or local legal aid for serious violations"
    ],
    "what_not_to_do": "Do not wait too long to file — some complaint processes have time limits. Do not exaggerate details; stick to accurate facts.",
    "source_statutes": [
      "42 U.S.C. § 1983",
      "Department internal affairs policies"
    ],
    "severity": "medium"
  },
  {
    "id": "US_FORCE_001_excessive_force",
    "country": "US",
    "category": "USE_OF_FORCE",
    "sub_issue": "EXCESSIVE_FORCE",
    "trigger_keywords": [
      "excessive force",
      "police hit me",
      "police used force",
      "injured by police"
    ],
    "situation_description": "You experienced or witnessed what seemed like excessive force by police",
    "right_plain": "Police may only use force that is 'objectively reasonable' given the circumstances. Excessive force can be challenged through a civil rights lawsuit (Section 1983) and criminal complaints against the officer, evaluated using the standard from Graham v. Connor.",
    "right_formal": "4th Amendment reasonableness standard for use of force",
    "script": "I want to document this incident. I am seeking medical attention and will be filing a complaint.",
    "escalation": [
      "Seek medical attention and document injuries immediately",
      "Get names/contact info of any witnesses",
      "Request any available body camera or dashcam footage through a records request",
      "File a complaint with Internal Affairs",
      "Contact a civil rights attorney about a potential lawsuit"
    ],
    "what_not_to_do": "Do not delay medical treatment. Do not discard any evidence like torn clothing. Do not give a detailed statement to investigators without a lawyer present.",
    "source_statutes": [
      "4th Amendment",
      "Graham v. Connor 1989",
      "42 U.S.C. § 1983"
    ],
    "severity": "critical"
  },
  {
    "id": "US_IMMIGRATION_001_ice_encounter",
    "country": "US",
    "category": "IMMIGRATION_ENCOUNTER",
    "sub_issue": "ICE_STOP",
    "trigger_keywords": [
      "ice stopped me",
      "immigration papers",
      "are you a citizen",
      "immigration officer"
    ],
    "situation_description": "ICE or police ask about your immigration status",
    "right_plain": "Regardless of immigration status, you have the right to remain silent and do not have to answer questions about where you were born or your immigration status. You do not have to sign any documents without speaking to a lawyer first. You have the right to refuse entry into your home without a signed judicial warrant.",
    "right_formal": "5th Amendment applies to all persons in the U.S. regardless of immigration status",
    "script": "I am exercising my right to remain silent. I do not wish to answer questions about my immigration status, and I want to speak to a lawyer.",
    "escalation": [
      "Stay calm and do not run",
      "State clearly you are exercising your right to remain silent",
      "Do not sign any document without a lawyer's review",
      "Ask to see a judicial warrant if they want to enter your home — an ICE administrative warrant is not the same as a judicial warrant",
      "Contact an immigration attorney or an organization like the ACLU or a local immigrant rights group immediately"
    ],
    "what_not_to_do": "Do not lie about your status. Do not sign anything you don't understand. Do not open your door without seeing a judicial warrant.",
    "source_statutes": [
      "5th Amendment",
      "4th Amendment"
    ],
    "severity": "critical"
  },
  {
    "id": "US_PROTEST_001_assembly_rights",
    "country": "US",
    "category": "PROTEST_RIGHTS",
    "sub_issue": "PEACEFUL_ASSEMBLY",
    "trigger_keywords": [
      "protest rights",
      "demonstration",
      "police at protest",
      "dispersal order"
    ],
    "situation_description": "You are participating in a protest or demonstration and police are present",
    "right_plain": "You have a First Amendment right to peacefully assemble and protest in public spaces. Police can impose reasonable time, place, and manner restrictions (e.g., permits for large marches), but cannot stop a protest simply because of its message. If given a dispersal order, you should comply to avoid arrest, then challenge the order's legality afterward.",
    "right_formal": "1st Amendment right to peaceful assembly",
    "script": "I am here peacefully exercising my First Amendment rights. What specifically is the dispersal order and reason?",
    "escalation": [
      "Stay peaceful and avoid physical confrontation",
      "If given a lawful dispersal order, comply to avoid arrest",
      "Document the situation if safely possible",
      "Note officer badge numbers and any use of force",
      "Contact the ACLU or a civil rights attorney if your rights were violated"
    ],
    "what_not_to_do": "Do not ignore a clear, lawful dispersal order — challenge it afterward instead of at the scene. Do not engage in violence or property destruction.",
    "source_statutes": [
      "1st Amendment",
      "Cox v. New Hampshire 1941"
    ],
    "severity": "high"
  },
  {
    "id": "US_JUVENILE_001_minor_rights",
    "country": "US",
    "category": "MINORS_RIGHTS",
    "sub_issue": "MINOR_ENCOUNTER",
    "trigger_keywords": [
      "my kid was stopped",
      "minor arrested",
      "juvenile rights",
      "underage stopped by police"
    ],
    "situation_description": "A minor (under 18) is stopped, questioned, or arrested by police",
    "right_plain": "Minors have most of the same constitutional rights as adults during police encounters, including the right to remain silent and the right to an attorney. Many states require police to notify a parent or guardian and, in some states, require a parent or attorney present before questioning a minor.",
    "right_formal": "5th and 6th Amendment rights apply to minors; state juvenile procedure statutes add protections",
    "script": "I am a minor / this is a minor. I am invoking my right to remain silent and want a parent or guardian and a lawyer present before any questioning.",
    "escalation": [
      "State clearly that you want a parent/guardian and lawyer present",
      "Do not answer questions until they arrive",
      "Parents should contact a juvenile defense attorney immediately",
      "Ask about the specific juvenile procedures in your state",
      "Request that the parent/guardian be notified immediately if not already done"
    ],
    "what_not_to_do": "Do not let a minor be questioned alone without requesting a guardian first. Do not sign any statement without legal counsel.",
    "source_statutes": [
      "5th Amendment",
      "6th Amendment",
      "State juvenile justice codes"
    ],
    "severity": "critical"
  },
  {
    "id": "US_SEARCH_001_refuse_consent",
    "country": "US",
    "category": "CONSENT_SEARCH",
    "sub_issue": "GENERAL_REFUSAL",
    "trigger_keywords": [
      "can i say no to a search",
      "refuse a search",
      "do i have to consent",
      "mind if i take a look"
    ],
    "situation_description": "Police ask for your general consent to search you, your bag, your car, or your property",
    "right_plain": "You always have the right to say no to a consent search of your person, belongings, vehicle, or home, unless the officer already has a warrant or another legal basis (like probable cause or a valid arrest). Refusing consent is not, by itself, evidence of guilt.",
    "right_formal": "4th Amendment; consent searches require voluntary agreement",
    "script": "I do not consent to a search.",
    "escalation": [
      "State this phrase clearly and calmly, once",
      "You do not need to explain why",
      "Do not physically resist if they search anyway after claiming other legal grounds",
      "Note the encounter details for a lawyer afterward",
      "An improper search can still be challenged in court after the fact"
    ],
    "what_not_to_do": "Do not say anything that could be taken as consent, even 'I guess so' or shrugging. Do not physically block officers — object verbally only.",
    "source_statutes": [
      "4th Amendment",
      "Schneckloth v. Bustamonte 1973"
    ],
    "severity": "medium"
  }
] as const;
