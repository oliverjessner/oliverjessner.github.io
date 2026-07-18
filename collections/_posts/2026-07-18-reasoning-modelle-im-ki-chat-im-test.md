---
layout: post
title: 'Reasoning-Modelle im KI-Chat: Gemini 3.5 Flash im Test'
date: 2026-07-18 11:48:23 +0100
authors: ['oliver_jessner']
meta_og_type: 'article'
categories:
    - KI
    - openai
    - Gesellschaft
description: 'Welcher KI-Chat denkt wirklich? Ein Rätselvergleich zeigt Stärken und Schwächen von ChatGPT, Claude, Gemini, DeepSeek und Qwen'
thumbnail: '/assets/images/gen/blog/reasoning-modelle-im-ki-chat-im-test/header_thumbnail.webp'
image: '/assets/images/gen/blog/reasoning-modelle-im-ki-chat-im-test/header.webp'
image_width: 1280
image_height: 721
faq:
    - question: 'Nutzt jeder KI-Chat automatisch ein Reasoning-Modell?'
      answer: 'Nein. Die Oberfläche kann unterschiedliche Modelle und Denkstufen einsetzen, automatisch umschalten oder je nach Tarif andere Optionen anbieten.'
    - question: 'Ist Gemini 3.5 Flash ein Reasoning-Modell?'
      answer: 'Ja. Google dokumentiert dynamisches Reasoning und eine mittlere Denkstufe als Standard. Das verhindert jedoch keine inhaltlichen Fehler.'
    - question: 'Warum beantwortet Gemini 3.5 Flash das geänderte Rätsel falsch?'
      answer: 'Die Antwort folgt offenbar dem bekannten Muster des klassischen Rätsels, statt die vertauschte Elternrolle konsequent mit der Schlussfolgerung abzugleichen.'
socialmedia:
    - 'Nutzt jeder KI-Chat ein Reasoning-Modell? Ich habe ChatGPT, Claude, Gemini, DeepSeek und Qwen mit zwei fast identischen Rätseln verglichen. Entscheidend ist nicht nur, ob ein Modell denkt, sondern ob es den Text wirklich prüft.'
    - 'Gemini 3.5 Flash ist der Standard in der Gemini-App und unterstützt Reasoning. Trotzdem scheitert es in meinem Test an einer kleinen Änderung im bekannten Chirurgen-Rätsel. Ein gutes Beispiel dafür, warum ein Denkmodus keine Qualitätsgarantie ist.'
    - 'Zehn KI-Konfigurationen, zwei gespiegelte Rätsel, ein überraschend uneinheitliches Ergebnis: Einige Modelle lesen präzise, andere wiederholen ein bekanntes Antwortmuster. Mein Praxisvergleich von ChatGPT, Claude, Gemini, DeepSeek und Qwen.'
---

Ein KI-Chat kann eine richtige Antwort liefern, ohne sichtbar nachzudenken. Umgekehrt kann ein Reasoning-Modell trotz Denkmodus scheitern. Zwei fast identische Rätsel zeigen, warum die Oberfläche allein wenig über die Verlässlichkeit verrät.

## Benutzt jeder KI-Chat ein Reasoning-Modell?

Die kurze Antwort lautet: Nein, jedenfalls nicht automatisch und nicht bei jeder Anfrage in derselben Form.

Ein KI-Chat wie ChatGPT, Claude, Gemini, DeepSeek oder Qwen ist zunächst eine Benutzeroberfläche. Dahinter kann ein festes Sprachmodell arbeiten. Die Oberfläche kann aber auch zwischen Modellen wechseln, eine Denkstufe anpassen oder Anfragen dynamisch weiterleiten. Welches Modell tatsächlich antwortet und wie viel Rechenzeit es für die Schlussfolgerung erhält, hängt unter anderem vom Tarif, vom gewählten Modus und von der Aufgabe ab.

Das Wort "Reasoning" bezeichnet dabei keine Garantie für korrekte Antworten. Gemeint ist, dass ein Modell vor der sichtbaren Antwort zusätzliche interne Rechenschritte nutzen kann. Anbieter setzen dafür unterschiedliche Begriffe ein. OpenAI spricht von "reasoning effort", Anthropic von "effort" und "extended thinking", DeepSeek von "Thinking Mode" und Qwen von "Thinking Mode" oder "Non-Thinking Mode". Bei Gemini heißt die Steuerung "thinking level".

Die jeweiligen Dokumentationen zeigen, dass die Grenze inzwischen fließend ist. Manche Modellfamilien unterstützen mehrere Denkstufen. Andere entscheiden dynamisch, ob und wie lange sie nachdenken. Ein sichtbarer Hinweis wie "Thought for 8 seconds" belegt zudem nur, dass die Oberfläche einen Denkprozess ausweist. Er beweist nicht, dass die Schlussfolgerung richtig ist.

## Der Test mit zwei fast identischen Rätseln

Für den Vergleich habe ich bewusst ein sehr bekanntes Rätsel gewählt. Es wurde über Jahre hinweg in unzähligen Artikeln, Foren und sozialen Netzwerken veröffentlicht. Deshalb ist davon auszugehen, dass aktuelle Sprachmodelle die klassische Fassung und ihre übliche Lösung aus ihren Trainingsdaten kennen.

In der klassischen Fassung lautet das Rätsel:

> Vater und Sohn fahren im Auto. Sie haben einen schweren Unfall, bei dem der Vater sofort stirbt. Der Bub wird mit schweren Kopfverletzungen in ein Krankenhaus gebracht, in dem ein Chef-Chirurg arbeitet, der eine bekannte Kapazität für Kopfverletzungen ist.
>
> Die Operation wird vorbereitet. Als der Chef-Chirurg erscheint, wird er blass und sagt: "Ich kann nicht operieren, das ist mein Sohn!"
>
> Frage: Wieso kann der Chirurg das Kind nicht operieren?

Die bekannte Lösung lautet: Die operierende Person ist die Mutter des Jungen. Das Rätsel spielt mit der verbreiteten Annahme, dass ein Chef-Chirurg automatisch ein Mann sein müsse.

Eine richtige Antwort auf diese Fassung sagt deshalb noch wenig darüber aus, ob ein Modell den Text tatsächlich logisch verarbeitet hat. Es könnte lediglich das bekannte Rätsel erkannt und die gespeicherte Standardantwort ausgegeben haben.

Um dieses reine Wiedererkennen zu erschweren, habe ich eine zentrale Information vertauscht:

> Mutter und Sohn fahren im Auto. Sie haben einen schweren Unfall, bei dem die Mutter sofort stirbt. Der Bub wird mit schweren Kopfverletzungen in ein Krankenhaus gebracht, in dem ein Chef-Chirurg arbeitet, der eine bekannte Kapazität für Kopfverletzungen ist.
>
> Die Operation wird vorbereitet. Als der Chef-Chirurg erscheint, wird er blass und sagt: "Ich kann nicht operieren, das ist mein Sohn!"
>
> Frage: In welchem Verwandtschaftsverhältnis stehen der Chirurg und das Kind?

Nun passt die bekannte Antwort nicht mehr ohne zusätzliche Annahmen. Die Mutter ist laut Aufgabenstellung beim Unfall gestorben. Die einfachste beabsichtigte Lösung lautet deshalb: Der Chirurg ist der Vater des Jungen.

Ein Modell, das hauptsächlich das vertraute Muster ergänzt, kann trotzdem wieder mit "Die Mutter" antworten. Ein Modell, das die geänderten Rollen sorgfältig prüft, sollte dagegen erkennen, dass die klassische Lösung nicht mehr zur Aufgabenstellung passt.

Reasoning sollte die Wahrscheinlichkeit dafür erhöhen. Ein Reasoning-Modell kann die beteiligten Personen, ihre Rollen und die zeitliche Abfolge ausdrücklich miteinander abgleichen. Der Vergleich zeigt allerdings auch: Ein aktivierter Denkmodus ist keine Garantie. Selbst Modelle mit sichtbarem Reasoning können auf die bekannte Antwort zurückfallen, wenn die Mustererkennung stärker wirkt als die Prüfung des konkreten Textes.

Jede Variante wurde in einem neuen Chat gestellt. So sollte verhindert werden, dass das Modell die zweite Antwort aus dem vorherigen Gespräch ableitet. Der Test prüft damit vor allem drei Dinge: das Erkennen einer veränderten Voraussetzung, die Konsistenz der Schlussfolgerung und den Unterschied zwischen wiedergegebenem Wissen und tatsächlichem Reasoning.

## Die Ergebnisse im Überblick

- **ChatGPT 5.6 High:** Mutter und Vater. Beide Varianten wurden direkt erkannt.
- **ChatGPT Free ohne Login:** Mutter und Vater. Beide Varianten wurden direkt erkannt.
- **Claude Sonnet 5 High:** Mutter und zweiter Vater. Die zweite Antwort ist plausibel.
- **Claude Sonnet 5 Medium:** Mutter und Mutter. Die zweite Antwort widerspricht der naheliegenden Lesart.
- **DeepSeek Expert mit DeepThink:** Mutter und bevorzugt Mutter, daneben Vater als Alternative. Die Ausführung ist lang, bleibt in der Schlussfolgerung aber inkonsistent.
- **DeepSeek Instant mit DeepThink:** Mutter und Vater. Beide Varianten wurden direkt erkannt.
- **Gemini 3.1 Pro:** Mutter und Vater. Beide Varianten wurden direkt erkannt.
- **Gemini 3.5 Flash:** Mutter und Mutter. Die zweite Variante wurde nicht konsistent aufgelöst.
- **Qwen 3.7 Max im Denkmodus:** Mutter und Vater. Beide Varianten wurden direkt erkannt.
- **Qwen 3.7 Plus im Denkmodus:** Mutter und Vater. Beide Varianten wurden direkt erkannt.

Sechs der zehn Konfigurationen liefern für beide Varianten genau die erwartete Kurzantwort. Claude Sonnet 5 High bleibt logisch möglich, nimmt aber ohne Not einen zweiten Vater an. Claude Sonnet 5 Medium, DeepSeek Expert und Gemini 3.5 Flash stolpern über die vertauschte Rolle der verstorbenen Person.

Damit ist Gemini 3.5 Flash im gesamten Feld nicht das einzige System mit einem Fehler. Es ist jedoch der auffälligste Fall im normalen Einstieg: Der Screenshot entstand ohne Anmeldung und ohne bewusste Modellwahl. Auch ChatGPT wurde ohne Login getestet und löste beide Fassungen korrekt.

Die folgenden Screenshots zeigen die Antworten auf die entscheidende, veränderte Variante. Ihre Reihenfolge entspricht der Ergebnisliste: ChatGPT 5.6 High, ChatGPT ohne Login, Claude Sonnet 5 High und Medium, DeepSeek Expert und Instant, Gemini 3.1 Pro und 3.5 Flash sowie Qwen 3.7 Max und Plus.

![ChatGPT 5.6 High erkennt in der veränderten Rätselvariante den Chirurgen als Vater.](/assets/images/gen/blog/reasoning-modelle-im-ki-chat-im-test/chatty_5_6_vater.webp)
![ChatGPT ohne Login erkennt in der veränderten Rätselvariante den Chirurgen als Vater.](/assets/images/gen/blog/reasoning-modelle-im-ki-chat-im-test/chatty_free_vater.webp)
![Claude Sonnet 5 High deutet den Chirurgen als zweiten Vater des Jungen.](/assets/images/gen/blog/reasoning-modelle-im-ki-chat-im-test/claude_free_sonnet_5_high_vater.webp)
![Claude Sonnet 5 Medium bleibt trotz der verstorbenen Mutter bei der klassischen Mutter-Antwort.](/assets/images/gen/blog/reasoning-modelle-im-ki-chat-im-test/claude_free_sonnet_5_medium_vater.webp)
![DeepSeek Expert mit DeepThink diskutiert Vater und Mutter, entscheidet sich aber für die Mutter.](/assets/images/gen/blog/reasoning-modelle-im-ki-chat-im-test/deepseek_expert_deepthink_vater.webp)
![DeepSeek Instant mit DeepThink erkennt in der veränderten Rätselvariante den Chirurgen als Vater.](/assets/images/gen/blog/reasoning-modelle-im-ki-chat-im-test/deepseek_instant_deepthink_vater.webp)
![Gemini 3.1 Pro erkennt in der veränderten Rätselvariante den Chirurgen als Vater.](/assets/images/gen/blog/reasoning-modelle-im-ki-chat-im-test/gemini_3_1_pro_free_vater.webp)
![Gemini 3.5 Flash erklärt den Chirurgen trotz der verstorbenen Mutter zur Mutter des Jungen.](/assets/images/gen/blog/reasoning-modelle-im-ki-chat-im-test/gemini_free_vater.webp)
![Qwen 3.7 Max im Denkmodus erkennt in der veränderten Rätselvariante den Chirurgen als Vater.](/assets/images/gen/blog/reasoning-modelle-im-ki-chat-im-test/qwen_3_7_max_vater.webp)
![Qwen 3.7 Plus im Denkmodus erkennt in der veränderten Rätselvariante den Chirurgen als Vater.](/assets/images/gen/blog/reasoning-modelle-im-ki-chat-im-test/qwen_3_7_plus_vater.webp)

## Warum der Gemini-Fehler besonders relevant ist

Google bezeichnet [Gemini 3.5 Flash als globales Standardmodell der Gemini-App](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5/). Wer Gemini öffnet und keine besondere Auswahl trifft, landet damit typischerweise bei genau diesem Modell. In meinem Screenshot ist oben links ebenfalls "Gemini 3.5 Flash" zu sehen.

Die Versionsnummern sollten dabei nicht vermischt werden. Der Pro-Test in diesem Vergleich lief mit Gemini 3.1 Pro. Der anonyme Standardtest lief mit Gemini 3.5 Flash. Googles aktuelles Standardmodell ist somit 3.5 Flash und nicht 3.1 Flash.

Es handelt sich dabei nicht um ein Modell ohne Reasoning. Laut [Google-Dokumentation unterstützt Gemini 3.5 Flash dynamisches Denken](https://ai.google.dev/gemini-api/docs/thinking) und nutzt standardmäßig die mittlere Denkstufe. Die falsche Antwort lässt sich daher nicht einfach damit erklären, dass Gemini gar nicht nachgedacht habe.

Wahrscheinlicher ist ein bekanntes Fehlermuster von Sprachmodellen: Das Modell erkennt die Form des klassischen Chirurgen-Rätsels und ruft die häufig gelernte Antwort "Die Mutter" ab. Die Änderung am Anfang wird zwar im Text wiederholt, aber nicht konsequent mit dem Ergebnis abgeglichen. Mustererkennung gewinnt gegen die Prüfung der konkreten Rollen.

Gerade die Begründung macht den Fehler sichtbar. Gemini erwähnt, dass die leibliche Mutter beim Unfall gestorben ist, erklärt den Chef-Chirurgen anschließend aber dennoch zur Mutter. Danach verweist es auf Geschlechterrollen und nennt zwei Väter als Alternative. Die Antwort klingt reflektiert, löst ihren eigenen Widerspruch jedoch nicht auf.

Das ist keine Besonderheit von Gemini allein. Claude Sonnet 5 Medium greift ebenfalls auf die klassische Antwort zurück. DeepSeek Expert erkennt den Widerspruch, diskutiert mehrere Möglichkeiten und endet trotzdem bei der Mutter. Mehr sichtbares Denken führt hier also nicht automatisch zu einer besseren Entscheidung.

## Reasoning ist eine Fähigkeit, kein Gütesiegel

Aktuelle Modelle verbinden schnelle Antworten und Reasoning zunehmend innerhalb derselben Modellfamilie. Google erlaubt bei Gemini 3.5 Flash mehrere Denkstufen. [Anthropic steuert die Denktiefe über "effort"](https://platform.claude.com/docs/en/build-with-claude/effort). [DeepSeek gibt im Thinking Mode Reasoning-Inhalte separat aus](https://api-docs.deepseek.com/guides/thinking_mode). [Qwen unterscheidet ausdrücklich zwischen Thinking und Non-Thinking](https://qwenlm.github.io/blog/qwen3/).

Für Nutzer ist diese Technik meist nur teilweise sichtbar. Ein Modellname allein sagt nicht, welche Parameter die Oberfläche verwendet. Ebenso wenig verrät eine kurze Antwort, ob intern zusätzliche Rechenschritte stattgefunden haben. Selbst Anbieterhinweise wie "High", "Medium" oder "DeepThink" beschreiben zunächst ein Rechenbudget oder einen Betriebsmodus, nicht die Qualität einer konkreten Antwort.

Der Vergleich zeigt deshalb drei verschiedene Ebenen:

1. Die Chat-Oberfläche bestimmt, welche Modelle und Modi zugänglich sind.
2. Das Modell entscheidet oder erhält Vorgaben dazu, wie viel Reasoning es nutzt.
3. Die sichtbare Antwort muss trotzdem auf Widersprüche, Quellen und praktische Plausibilität geprüft werden.

Wer sich mit [KI](https://oliverjessner.at/category/ki/) beschäftigt, sollte diese Ebenen nicht vermischen. Auch bei [OpenAI](https://oliverjessner.at/category/openai/) und den anderen Anbietern kann sich die Modellwahl je nach Konto, Tarif und Auslastung ändern. Ein Vergleich ist daher immer eine Momentaufnahme.

## Die praktische Gefahr im Alltag

Ein falsch gelöstes Rätsel richtet keinen Schaden an. Das zugrunde liegende Verhalten kann in echten Aufgaben jedoch problematisch werden. Besonders riskant sind Antworten, die vertraut klingen und sauber formuliert sind, obwohl sie eine geänderte Bedingung übersehen.

Das kann bei Zusammenfassungen, Supportfällen, Verträgen, medizinischen Informationen oder Quellcode passieren. Ein Modell erkennt ein häufiges Muster und ergänzt die wahrscheinliche Standardantwort. Eine kleine Abweichung im konkreten Fall geht dabei verloren. Je flüssiger die Erklärung klingt, desto leichter wird sie ungeprüft übernommen.

**Warnhinweis:** Bei Entscheidungen mit rechtlichen, medizinischen, finanziellen oder sicherheitsrelevanten Folgen sollte eine KI-Antwort nie die einzige Prüfquelle sein. Wichtige Aussagen gehören mit Primärquellen oder fachkundiger Hilfe kontrolliert.

Für normale Alltagsaufgaben helfen bereits einfache Gegenfragen:

- "Welche Aussage im Prompt stützt deine Antwort?"
- "Prüfe deine Lösung auf Widersprüche zur ersten Zeile."
- "Welche anderen Erklärungen sind mit dem Text vereinbar?"
- "Welche Annahme hast du ergänzt, obwohl sie nicht im Prompt steht?"

Diese Rückfragen ersetzen keine fachliche Prüfung. Sie zwingen das Modell aber dazu, Rollen, Bedingungen und Zusatzannahmen noch einmal offenzulegen.

## Was aus dem Vergleich bleibt

Nicht jeder KI-Chat verwendet bei jeder Anfrage automatisch ein Reasoning-Modell. Viele aktuelle Systeme können jedoch dynamisch denken oder bieten steuerbare Denkstufen. Ob diese Funktion aktiv ist, hängt von Modell, Oberfläche, Konto und Einstellung ab.

Der kleine Vergleich liefert zugleich eine wichtigere Antwort: Reasoning ist nützlich, aber kein Schutz vor oberflächlicher Mustererkennung. Gemini 3.5 Flash unterstützt Reasoning und ist der Standard für viele normale Nutzer. Trotzdem übernimmt es in diesem Test die bekannte Pointe eines Rätsels, obwohl eine zentrale Rolle vertauscht wurde.

Für die Praxis zählt deshalb weniger, ob neben dem Modellnamen ein Denkmodus steht. Entscheidend ist, ob die Antwort die konkrete Aufgabe erfüllt, ihre Annahmen offenlegt und keine Bedingung aus dem Ausgangstext ignoriert. Das ist eine technische Frage, aber auch eine Frage unserer [Gesellschaft](https://oliverjessner.at/category/gesellschaft/): Je selbstverständlicher KI-Antworten in den Alltag einfließen, desto wichtiger wird eine ruhige, nachvollziehbare Prüfung.
