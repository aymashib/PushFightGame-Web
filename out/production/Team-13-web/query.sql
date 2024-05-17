/*SELECT
    g.game_id AS id,
    g.start_time AS date,
    p.player_name,
    (CASE WHEN g.winner THEN ROUND(RANDOM() * 50 + 50) ELSE ROUND(RANDOM() * 50) END) AS score, -- made up, 0..49 for losses, 50..100 for wins
    ROUND(CAST(AVG(CASE WHEN t.nr_of_movements <> 0 THEN EXTRACT(EPOCH FROM (t.end_time - t.start_time)) / t.nr_of_movements ELSE NULL END) AS numeric), 2) AS avg_movement_duration,
    CASE WHEN g.winner THEN 'W' ELSE 'L' END AS winner
FROM
    game g
        JOIN
    turn t ON g.game_id = t.game_id
        JOIN
    player p ON g.player_id = p.player_id
GROUP BY
    g.game_id, g.start_time, g.end_time, g.winner, p.player_name;
*/

/*SELECT
    g.game_id AS id,
    TO_CHAR(g.start_time, 'YYYY-MM-DD HH24:MI:SS') AS date,
    p.player_name,
    (CASE WHEN g.winner THEN ROUND(RANDOM() * 50 + 50) ELSE ROUND(RANDOM() * 50) END) AS score, -- made up, 0..49 for losses, 50..100 for wins
    ROUND(CAST(AVG(CASE WHEN t.nr_of_movements <> 0 THEN EXTRACT(EPOCH FROM (t.end_time - t.start_time)) / t.nr_of_movements ELSE NULL END) AS numeric), 2) AS avg_movement_duration,
    CASE WHEN g.winner THEN 'W' ELSE 'L' END AS winner
FROM
    game g
        JOIN
    turn t ON g.game_id = t.game_id
        JOIN
    player p ON g.player_id = p.player_id
GROUP BY
    g.game_id, g.start_time, g.end_time, g.winner, p.player_name;*/

SELECT
    g.game_id AS id,
    TO_CHAR(g.start_time, 'YYYY-MM-DD') AS date,
    p.player_name,
    (CASE WHEN g.winner THEN ROUND(RANDOM() * 50 + 50) ELSE ROUND(RANDOM() * 50) END) AS score, -- made up, 0..49 for losses, 50..100 for wins
    ROUND(CAST(AVG(CASE WHEN t.nr_of_movements <> 0 THEN EXTRACT(EPOCH FROM (t.end_time - t.start_time)) / t.nr_of_movements ELSE NULL END) AS numeric), 2) AS avg_movement_duration,
    CASE WHEN g.winner THEN 'W' ELSE 'L' END AS winner
FROM
    game g
        JOIN
    turn t ON g.game_id = t.game_id
        JOIN
    player p ON g.player_id = p.player_id
GROUP BY
    g.game_id, g.start_time, g.end_time, g.winner, p.player_name;

