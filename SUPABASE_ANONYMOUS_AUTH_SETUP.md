# Supabase Anonymous Authentication Setup

## Problem
Die Anwendung zeigt die Fehlermeldung: **"⚠️ Anonymous sign-ins are disabled"**

## Lösung

### 1. Supabase Dashboard Konfiguration

Um anonyme Anmeldungen zu aktivieren, müssen Sie die Einstellungen im Supabase Dashboard anpassen:

#### Schritt-für-Schritt Anleitung:

1. **Öffnen Sie Ihr Supabase Dashboard**
   - Gehen Sie zu: https://supabase.com/dashboard
   - Wählen Sie Ihr Projekt aus (`xukdlcealekhgnimngio`)

2. **Navigieren Sie zu Authentication Settings**
   - Klicken Sie in der linken Seitenleiste auf **"Authentication"**
   - Klicken Sie dann auf **"Providers"**

3. **Aktivieren Sie Anonymous Sign-Ins**
   - Scrollen Sie nach unten zu **"Anonymous Sign-ins"**
   - Aktivieren Sie den Toggle-Schalter: **"Enable anonymous sign-ins"**
   - Klicken Sie auf **"Save"**

### 2. Datenbank-Migration

Die notwendigen Datenbank-Migrationen wurden bereits angewendet:

- ✅ `trainer_memberships` Tabelle erstellt
- ✅ RLS Policies für Trainer-Zugriff konfiguriert
- ✅ Policies für anonyme User hinzugefügt

### 3. Code-Änderungen

Die folgenden Anpassungen wurden bereits vorgenommen:

- ✅ `MultiplayerService.signInAnonymously()` verwendet jetzt die native Supabase API
- ✅ Entfernung des temporären Email/Passwort-Workarounds
- ✅ Korrekte Metadaten-Speicherung für anonyme User

### 4. Funktionsweise

#### Für normale Spieler (name-only Modus):
1. Spieler gibt seinen Namen ein
2. `supabase.auth.signInAnonymously()` wird aufgerufen
3. User erhält anonyme Session
4. Spieler kann Spiel erstellen oder beitreten

#### Für Trainer:
1. Trainer wählt Rolle "TRAINER" aus
2. Gibt Trainer-Passwort ein (`observer101`)
3. `supabase.auth.signInAnonymously()` wird aufgerufen
4. Trainer-Eintrag wird in `trainer_memberships` erstellt
5. Trainer erhält Lesezugriff auf alle Spieldaten via RLS Policies

### 5. Sicherheit

Die RLS Policies stellen sicher, dass:

- ✅ Trainer nur LESEN können, nicht schreiben
- ✅ Trainer nur auf Spiele zugreifen können, für die sie eine Membership haben
- ✅ Normale Spieler nur ihre eigenen Daten sehen
- ✅ Alle sensiblen Operationen sind geschützt

### 6. Testen

Nach der Aktivierung im Supabase Dashboard können Sie testen:

1. **Normaler Spieler-Login:**
   ```
   - Namen eingeben → "Weiter" → Spiel erstellen/beitreten
   ```

2. **Trainer-Login:**
   ```
   - Rolle "TRAINER" wählen
   - Passwort "observer101" eingeben
   - Spiel erstellen oder Game-ID zum Beitreten eingeben
   ```

### 7. AdminPanel-Konfiguration

Im **AdminPanelMPM** können Sie den Authentifizierungsmodus für das Spiel festlegen:

- **name-only (Anonym)**: Spieler melden sich ohne Email an ✅ Empfohlen
- **email**: Spieler brauchen Email/Passwort
- **preset-credentials**: Vordefinierte Zugangsdaten

**Wichtig:** Für den `name-only` Modus MUSS "Anonymous Sign-ins" in Supabase aktiviert sein!

### 8. Trainer-Feature aktivieren

Im AdminPanelMPM unter **"Trainer*in-Teilnahme"**:

1. Checkbox aktivieren: "Trainer*in‑Teilnahme aktivieren"
2. "Übernehmen" klicken
3. Trainer-Rolle wird nun im Login-Panel angezeigt

## Zusammenfassung

✅ **Datenbank:** Migrationen angewendet
✅ **Code:** Angepasst für native anonymous auth
⚠️ **Dashboard:** Anonymous sign-ins müssen aktiviert werden (manueller Schritt)
✅ **RLS:** Policies für Trainer-Zugriff konfiguriert

Nach der Aktivierung im Supabase Dashboard sollte die Anwendung ohne Probleme funktionieren!

## Support

Bei Problemen überprüfen Sie:

1. Browser-Konsole auf Fehler
2. Supabase Dashboard → Authentication → Users (werden anonyme User erstellt?)
3. Supabase Dashboard → Database → RLS Policies (sind die Policies aktiv?)
