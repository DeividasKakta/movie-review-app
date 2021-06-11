INSERT INTO movie (id, title, picture, description, cast, release_date, creation_date) VALUES
        ('0c9d9f98-c90a-459d-af35-0ff5c2105127', 'Kodzilla versus Gang', 'https://source.unsplash.com/random',
        'Faucibus a pellentesque sit amet porttitor eget. Egestas integer eget aliquet nibh praesent. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Lorem sed risus ultricies tristique nulla. Nunc eget lorem dolor sed viverra. Sed id semper risus in hendrerit gravida rutrum quisque.',
        'Cierra Vega, Alden Cantrell, Kierra Gentry, Pierre Cox', '2021-03-31', '2021-06-05'),
        ('0c9d9f98-c90a-459d-af35-0ff5c2105100', 'Revengers - Last Game', 'https://source.unsplash.com/random',
        'Integer malesuada nunc vel risus commodo viverra maecenas accumsan. Donec massa sapien faucibus et molestie ac. Aliquam ut porttitor leo a diam sollicitudin tempor id. Et ultrices neque ornare aenean euismod elementum nisi quis. Porta non pulvinar neque laoreet suspendisse interdum consectetur. Diam in arcu cursus euismod quis viverra nibh cras. Nibh venenatis cras sed felis eget velit aliquet. Dui nunc mattis enim ut tellus elementum.',
        'Thomas Crane, Miranda Shaffer, Bradyn Kramer, Alvaro Mcgee', '2019-07-15', '2021-06-04');

INSERT INTO role (id, name) VALUES
('e37f1daf-49c6-4ac1-bd1c-71056e224537', 'USER'),
('af4abdf2-9ba9-11eb-a8b3-0242ac130799', 'ADMIN');

INSERT INTO user (id, username, password) VALUES
    ('af4abdf2-9ba9-11eb-a8b3-0242ac130799', 'admin', '{bcrypt}$2y$12$jTtuvT/AazGVykRoiOP8JOQmoCsYrk.QpwpaVKVreNWJZhTDvMJom'), --admin
    ('af4abdf2-9ba9-11eb-a8b3-0242ac130111', 'user', '{bcrypt}$2y$12$dVmx09FiZcWBf2kE3mRRgO4DVeC0wdVZHLKH/aDrCiaKz/80AWAJC'), --pass
    ('af4abdf2-9ba9-11eb-a8b3-0242ac130222', 'another', '{bcrypt}$2y$12$dVmx09FiZcWBf2kE3mRRgO4DVeC0wdVZHLKH/aDrCiaKz/80AWAJC'); --pass

INSERT INTO user_roles (user_id, roles_id) VALUES
('af4abdf2-9ba9-11eb-a8b3-0242ac130799', 'af4abdf2-9ba9-11eb-a8b3-0242ac130799'),
('af4abdf2-9ba9-11eb-a8b3-0242ac130799', 'e37f1daf-49c6-4ac1-bd1c-71056e224537'),
('af4abdf2-9ba9-11eb-a8b3-0242ac130111', 'e37f1daf-49c6-4ac1-bd1c-71056e224537'),
('af4abdf2-9ba9-11eb-a8b3-0242ac130222', 'e37f1daf-49c6-4ac1-bd1c-71056e224537');

INSERT INTO review (id, user_id, movie_id, title, content, date, rating) VALUES
    ('af4abdf2-9ba9-11eb-a8bc-2242ac130799', 'af4abdf2-9ba9-11eb-a8b3-0242ac130799', '0c9d9f98-c90a-459d-af35-0ff5c2105127',
     'Lorem ipsum dolor sit amet',
     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
     '2021-06-04', 8),
    ('af4abdf2-9ba9-11eb-a8bc-2242ac130722', 'af4abdf2-9ba9-11eb-a8b3-0242ac130111', '0c9d9f98-c90a-459d-af35-0ff5c2105127',
     'Duis aute irure dolor in reprehenderit in voluptate velit',
     'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
     '2021-06-05', 6),
    ('af4abdf2-9ba9-11eb-a8bc-2242ac000799', 'af4abdf2-9ba9-11eb-a8b3-0242ac130799', '0c9d9f98-c90a-459d-af35-0ff5c2105100',
     'Ut enim ad minim veniam',
     'Ultricies tristique nulla aliquet enim. Sed augue lacus viverra vitae congue eu consequat ac. Sed nisi lacus sed viverra tellus in hac. Vitae justo eget magna fermentum iaculis. Laoreet suspendisse interdum consectetur libero id faucibus nisl. Sit amet massa vitae tortor condimentum lacinia quis vel. Est sit amet facilisis magna. Nascetur ridiculus mus mauris vitae ultricies leo integer malesuada.',
     '2021-05-08', 6),
    ('af4abdf2-9ba9-11eb-a8bc-2242ac110799', 'af4abdf2-9ba9-11eb-a8b3-0242ac130111', '0c9d9f98-c90a-459d-af35-0ff5c2105100',
     'Ultricies tristique nulla aliquet enim.',
     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
     '2021-04-25', 9),
    ('af4abdf2-9ba9-11eb-a8bc-2242ac220799', 'af4abdf2-9ba9-11eb-a8b3-0242ac130222', '0c9d9f98-c90a-459d-af35-0ff5c2105100',
     'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia',
     'Amet facilisis magna etiam tempor orci eu lobortis elementum. Morbi tincidunt augue interdum velit euismod. Risus nec feugiat in fermentum posuere urna nec tincidunt praesent. Eu consequat ac felis donec et. Adipiscing elit pellentesque habitant morbi. Ullamcorper malesuada proin libero nunc consequat interdum varius sit amet. Gravida quis blandit turpis cursus in hac habitasse. Tempor orci dapibus ultrices in iaculis nunc sed.',
     '2021-06-04', 10);