# Markdown Templates

Diese Datei dokumentiert die wiederverwendbaren Markdown-Bausteine in diesem Repo.

## Grundschema für Custom-Markdown-Bausteine

Wenn wir etwas bauen, das direkt in `.md`-Dateien nutzbar sein soll, halten wir uns an dieses Schema:

1. Das HTML-Markup liegt als Include unter `_includes/framework/blocks/components/`.
2. Das Verhalten liegt als kleines, generisches Skript unter `assets/js/`.
3. Die Styles liegen zentral unter `_sass/framework/selfmade/content.scss`, damit sie überall innerhalb von `.content` funktionieren.
4. Das Include wird in Markdown per `capture` plus `include` verwendet, damit auch mehrzeilige Inhalte sauber übergeben werden können.

Dieses Muster ist absichtlich simpel: Markdown bleibt lesbar, die Logik bleibt zentral und neue Bausteine lassen sich ohne Copy-Paste in weiteren Artikeln wiederverwenden.

## Copy-Snippet mit Button

Pfad des Includes:

```text
_includes/framework/blocks/components/copy-snippet.html
```

Typischer Einsatz in einem Markdown-Post:

```liquid
{% capture example_template %}
Hello,

This is a reusable template block.
{% endcapture %}

{% include framework/blocks/components/copy-snippet.html
    title="Vorlage zum Kopieren"
    description="Kurze Erklärung für den Leser."
    content=example_template
    language="text"
    button_label="Template kopieren"
    copied_label="Template kopiert"
    error_label="Erneut versuchen"
    success_message="Der Inhalt liegt jetzt in der Zwischenablage."
    error_message="Kopieren fehlgeschlagen. Bitte manuell markieren."
%}
```

## Parameter des Copy-Snippets

- `title`: Überschrift des Blocks.
- `description`: Kurze Zusatzbeschreibung unter der Überschrift.
- `content`: Der eigentliche mehrzeilige Inhalt. Dafür immer vorher `capture` nutzen.
- `language`: CSS-Klasse für das `<code>`-Element, zum Beispiel `text`, `bash` oder `json`.
- `button_label`: Standardtext des Buttons.
- `copied_label`: Button-Text nach erfolgreichem Kopieren.
- `error_label`: Button-Text, wenn das Kopieren fehlschlägt.
- `success_message`: Statusmeldung unter dem Block bei Erfolg.
- `error_message`: Statusmeldung unter dem Block bei Fehlern.

## Wichtige Hinweise

- Für mehrzeilige Inhalte nicht versuchen, den Text direkt inline ins Include zu schreiben. Immer `capture` verwenden.
- Wenn der zu kopierende Inhalt selbst Liquid-Tags wie `{{ ... }}` oder `{% ... %}` enthalten soll, den Inhalt im `capture` zusätzlich mit `{% raw %}` und `{% endraw %}` schützen.
- Das Skript für den Copy-Button wird global im Default-Layout geladen, macht aber nichts, wenn kein Copy-Snippet auf der Seite vorhanden ist.

## Aktueller Stand

Der erste dokumentierte Custom-Baustein ist der Copy-Button für Templates. Beispiel im Repo:

```text
collections/_posts/2026-04-02-wie-werde-ich-pr-mails-und-pr-scam-los.md
```
