SELECT
    player_name AS username,
    REVERSE(player_name) AS password,
    CASE WHEN player_name IN ('Ivan', 'Safa', 'Markus', 'Cas', 'Ayman', 'Gloria') THEN true ELSE false END AS admin_role
FROM
    player;
