INSERT INTO movie (id, title, description, cast, release_date) VALUES
        ('0c9d9f98-c90a-459d-af35-0ff5c2105127', 'Godzilla vs. Kong',
        'The epic next chapter in the cinematic Monsterverse pits two of the greatest icons in motion picture history against one another - the fearsome Godzilla and the mighty Kong - with humanity caught in the balance.',
        'Alexander Skarsgård, Millie Bobby Brown, Rebecca Hall ', '2021-03-31');

INSERT INTO user (id, username, password) VALUES
    ('af4abdf2-9ba9-11eb-a8b3-0242ac130799', 'admin', '{bcrypt}$2y$12$jTtuvT/AazGVykRoiOP8JOQmoCsYrk.QpwpaVKVreNWJZhTDvMJom'); --admin

INSERT INTO review (id, user_id, movie_id, content, date, rating) VALUES
    ('af4abdf2-9ba9-11eb-a8bc-2242ac130799', 'af4abdf2-9ba9-11eb-a8b3-0242ac130799', '0c9d9f98-c90a-459d-af35-0ff5c2105127',
     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
     '2021-06-04', 8),
    ('af4abdf2-9ba9-11eb-a8bc-2242ac130722', 'af4abdf2-9ba9-11eb-a8b3-0242ac130799', '0c9d9f98-c90a-459d-af35-0ff5c2105127',
     'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
     '2021-06-05', 6);