<!-- 
1.1 → If you delete or merge it, then if a seat is held by X, Y might accidentally release it — leading to a lot of mess. -->


<!-- v1.2 
// 1. Fetch all held seats from the server using bus_id and seat_type.
// 2. Store all held seat numbers (regardless of user) in seatOnHold for UI rendering.
// 3. If a seat is held by the current user (user_id === 11), also store it in currentHold
//    for release logic—otherwise, the user won’t be able to release their own holds due to strict backend checks. 
-->