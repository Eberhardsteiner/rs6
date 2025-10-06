# Multiplayer Testing Checklist

## Testing the Three Core Requirements

This document provides a comprehensive manual testing checklist for verifying the robust multiplayer implementation focusing on:
1. Role locking (visual and database-level)
2. Real-time lobby visibility
3. Join-in-progress functionality

---

## Setup

### Prerequisites
- Database migration applied successfully (`20251006140202_robust_multiplayer_role_locking.sql`)
- Application built and running
- At least 2 browser windows/profiles for testing
- Clear browser storage before each test run

### Test Environment
- Browser A: Chrome/Firefox (normal mode)
- Browser B: Chrome/Firefox (incognito/private mode)
- Browser C: Different browser or profile (optional)

---

## Test 1: Role Locking - Visual Indicators

**Goal:** Verify that occupied roles are visually disabled in the UI

### Steps:
1. Open Browser A
2. Navigate to multiplayer mode
3. Create a new game with any name
4. Select role **CEO** and proceed to lobby
5. Copy the game code/URL

6. Open Browser B
7. Join the game using the code from step 5
8. Observe the role selection screen

### Expected Results:
- CEO role should be **visually disabled** (grayed out, locked icon, strikethrough, or similar)
- Other roles (CFO, OPS, HRLEGAL) should be **selectable**
- A count of occupied roles should be visible (e.g., "1/4 roles taken")

### Pass Criteria:
- ✅ CEO role is visually marked as occupied
- ✅ Cannot click/select CEO role
- ✅ Other roles remain selectable
- ✅ Real-time update: if Browser A changes role, Browser B sees the update within 2 seconds

---

## Test 2: Role Locking - Database Enforcement (Race Condition)

**Goal:** Verify that double role assignment is prevented at the database level, even with simultaneous attempts

### Steps:
1. Open Browser A and Browser B side-by-side
2. Both browsers should join the same game
3. Both browsers navigate to role selection
4. **Simultaneously** click on the **CFO** role in both browsers (try to click at exactly the same time)

### Expected Results:
- **One browser succeeds** and joins as CFO
- **One browser receives an error** message: "Diese Rolle ist bereits belegt. Bitte wähle eine andere Rolle."
- The losing browser stays on the role selection screen
- The winning browser proceeds to the lobby

### Pass Criteria:
- ✅ Only one player successfully claims CFO
- ✅ Second player gets clear error message (German: "Diese Rolle ist bereits belegt")
- ✅ No duplicate roles in database (verify with Supabase dashboard if possible)
- ✅ Losing player can select a different role and successfully join

---

## Test 3: Real-time Lobby Visibility - Player Presence

**Goal:** Verify that players see each other in the lobby in real-time

### Steps:
1. Browser A creates a game and selects CEO role
2. Browser A is now in the lobby
3. Browser B joins the game and selects CFO role

### Expected Results:
- When Browser B joins the lobby, Browser A should see **CFO player appear within 2 seconds**
- Both browsers show:
  - Player name/identifier
  - Role assigned
  - "Active" or presence indicator (green dot, pulse animation, etc.)

### Pass Criteria:
- ✅ Browser A sees Browser B join the lobby within 2 seconds
- ✅ Both players see each other's names and roles
- ✅ Presence indicators show both players are "online" or "active"
- ✅ Player cards update in real-time (no page refresh needed)

---

## Test 4: Real-time Lobby Visibility - Last Seen / Heartbeat

**Goal:** Verify heartbeat mechanism tracks player activity

### Steps:
1. Browser A and Browser B are both in the lobby
2. Close Browser B entirely (or kill the browser process)
3. Wait 2-3 minutes
4. Observe Browser A's lobby view

### Expected Results:
- After ~2 minutes (120 seconds), Browser A should show Browser B as:
  - "Disconnected" or
  - "Inactive" or
  - Last seen indicator shows "> 2 min ago"

### Pass Criteria:
- ✅ Active players show "Active" or recent last_seen timestamp
- ✅ Disconnected players show "Disconnected" or stale timestamp after 2 minutes
- ✅ Heartbeat updates occur every 30 seconds (check browser console logs)

---

## Test 5: Join-in-Progress - Running Game Entry

**Goal:** Verify that players can join a game that is already running without waiting

### Steps:
1. Browser A creates a game, selects CEO, enters lobby
2. Browser A starts the game (moves to "running" status)
3. Browser A makes some decisions (advance to Day 2 or 3)
4. Browser B attempts to join the game using the game code

### Expected Results:
- Browser B sees a **"Join Now"** or **"Jetzt beitreten"** button in the lobby
- When Browser B clicks "Join Now":
  - Browser B is **immediately** taken into the running game
  - Browser B sees the current day (Day 2 or 3)
  - Browser B sees current KPI values
  - Browser B can make decisions for their role
  - **No waiting** for Browser A or other players

### Pass Criteria:
- ✅ Browser B can select an available role (CFO, OPS, or HRLEGAL)
- ✅ Browser B joins the running game immediately (no countdown or waiting screen)
- ✅ Browser B's game state syncs with current day and KPIs
- ✅ Browser B can participate in decisions right away
- ✅ Browser A sees Browser B appear as "In Game" in the player list

---

## Test 6: Join-in-Progress - State Synchronization

**Goal:** Verify that late-joining players receive correct game state

### Steps:
1. Browser A (CEO) starts game and advances to Day 5
2. Browser A makes several decisions, KPIs have changed significantly
3. Browser B joins as CFO during Day 5
4. Compare KPI values and game state between browsers

### Expected Results:
- Browser B's KPI cockpit shows **the same values** as Browser A
- Browser B sees the correct **current day** (Day 5)
- Browser B can see pending decisions for CFO role
- Both browsers are synchronized

### Pass Criteria:
- ✅ KPI values match between Browser A and Browser B
- ✅ Current day matches
- ✅ Browser B can make decisions that affect both players
- ✅ Decision history is available (if applicable to role)

---

## Test 7: Multiple Simultaneous Joins

**Goal:** Stress test with multiple players joining simultaneously

### Steps:
1. Browser A creates game, selects CEO
2. Browser B, C, and D attempt to join **at the same time**
3. Each browser selects a different role (CFO, OPS, HRLEGAL)

### Expected Results:
- All three browsers successfully join with their selected roles
- No role conflicts
- All players appear in the lobby
- Game can start when all are ready

### Pass Criteria:
- ✅ All 4 roles are filled (CEO, CFO, OPS, HRLEGAL)
- ✅ No duplicate roles
- ✅ All players visible to each other in lobby
- ✅ Game starts successfully with all 4 players

---

## Test 8: TRAINER Role - Exception to Role Locking

**Goal:** Verify that TRAINER role can be assigned multiple times (not subject to role locking)

### Steps:
1. Browser A creates game and joins as TRAINER (password: observer101)
2. Browser B joins the same game and also selects TRAINER role
3. Verify both can join as TRAINER simultaneously

### Expected Results:
- Both Browser A and Browser B successfully join as TRAINER
- No "role taken" error for TRAINER role
- Multiple TRAINER players can coexist

### Pass Criteria:
- ✅ Multiple TRAINER roles allowed in same game
- ✅ TRAINER role is not marked as "occupied" for other players
- ✅ No database constraint violations

---

## Test 9: Error Handling - Network Retry

**Goal:** Verify robust error handling with network issues

### Steps:
1. Open Browser A, create game
2. Open browser DevTools → Network tab
3. Set network to "Slow 3G" or "Offline"
4. Attempt to select a role
5. Restore network connection
6. Observe retry behavior

### Expected Results:
- With slow network: Loading indicator appears, operation eventually succeeds
- With offline network: Clear error message appears
- When connection restored: Automatic retry (exponential backoff)
- User is informed of network issues

### Pass Criteria:
- ✅ Clear error messages for network failures
- ✅ Automatic retry mechanism works (check console logs)
- ✅ Maximum 3 retry attempts
- ✅ Graceful fallback when retries exhausted

---

## Test 10: Occupied Roles Real-time Update

**Goal:** Verify that occupied roles update in real-time during role selection

### Steps:
1. Browser A creates game, stays on initial screen (has not selected role yet)
2. Browser B joins game, selects CEO role
3. Observe Browser A's role selection screen (without refreshing)

### Expected Results:
- Browser A's screen automatically updates
- CEO role becomes disabled/locked in Browser A
- Update happens within 1-2 seconds
- No page refresh required

### Pass Criteria:
- ✅ Real-time subscription active (check console logs)
- ✅ CEO role becomes locked in Browser A automatically
- ✅ Update latency < 2 seconds
- ✅ Visual feedback is immediate and clear

---

## Verification Checklist Summary

### Role Locking
- [ ] Visual indicators show occupied roles
- [ ] Database prevents double role assignment
- [ ] Concurrent role claims handled correctly
- [ ] TRAINER role allows multiple assignments

### Real-time Lobby Visibility
- [ ] Players see each other join immediately
- [ ] Presence indicators show online/offline status
- [ ] Heartbeat mechanism updates every 30 seconds
- [ ] Disconnected players marked after 2 minutes

### Join-in-Progress
- [ ] "Join Now" CTA appears for running games
- [ ] Late joiners enter immediately (no waiting)
- [ ] Game state syncs correctly (day, KPIs)
- [ ] Multiple simultaneous joins work correctly

### Error Handling
- [ ] Clear error messages in German
- [ ] Network retry with exponential backoff
- [ ] Graceful degradation on connection loss
- [ ] No crashes or undefined states

---

## Troubleshooting

### Issue: Roles not updating in real-time
**Solution:** Check browser console for Realtime subscription status. Verify Supabase Realtime is enabled.

### Issue: "Role taken" error even when role appears free
**Solution:** Clear browser localStorage and refresh. Verify database has no orphaned player records.

### Issue: Heartbeat not working
**Solution:** Check console logs for heartbeat messages every 30 seconds. Verify player_id is set correctly.

### Issue: Join-in-progress not working
**Solution:** Verify game status is 'running' in database. Check that rpc_set_game_status function exists.

---

## Console Logs to Monitor

During testing, watch for these console messages:

- `[MP] Starting heartbeat and real-time observation`
- `Heartbeat updated` (every 30 seconds)
- `Players change detected:` (when players join/leave)
- `Occupied roles fetched:` (real-time role updates)
- `Successfully claimed role: CEO in game: <uuid>` (successful join)
- `Presence sync: X online` (presence tracking)

---

## Database Verification (Optional)

If you have access to Supabase dashboard:

1. Check `players` table:
   - Verify `left_at` is NULL for active players
   - Verify `status` is 'lobby' or 'in_game'
   - Verify `last_seen` updates every ~30 seconds
   - Verify no duplicate (game_id, role) pairs (except TRAINER)

2. Check `games` table:
   - Verify `status` column exists
   - Verify status changes from 'waiting' → 'running' → 'ended'

3. Verify RPC functions exist:
   - `rpc_claim_role_and_join`
   - `rpc_mark_player_left`
   - `rpc_set_game_status`

---

## Success Criteria

All three core requirements are considered **successfully implemented** if:

1. **Role Locking:** No duplicate role assignments possible, even with concurrent attempts. Visual indicators correctly show occupied roles.

2. **Lobby Visibility:** Players see each other within 2 seconds of joining. Presence indicators accurately reflect online/offline status.

3. **Join-in-Progress:** Players can join running games immediately and participate without waiting for the current round to end.

---

## Notes

- Tests should be performed multiple times to ensure consistency
- Network conditions may affect timing (accept 1-3 second variance)
- Browser console logs are essential for debugging
- Clear localStorage between test runs for clean state

---

End of Testing Checklist
