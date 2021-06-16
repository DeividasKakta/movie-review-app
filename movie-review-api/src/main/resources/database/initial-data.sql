INSERT INTO movie (id, title, picture, description, cast, release_date, creation_date) VALUES
        ('0c9d9f98-c90a-459d-af35-0ff5c2105127', 'Kodzilla versus Gong', 'https://images.unsplash.com/photo-1623042513067-1c5383626620?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
        'Faucibus a pellentesque sit amet porttitor eget. Egestas integer eget aliquet nibh praesent. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Lorem sed risus ultricies tristique nulla. Nunc eget lorem dolor sed viverra. Sed id semper risus in hendrerit gravida rutrum quisque.',
        'Cierra Vega, Alden Cantrell, Kierra Gentry, Pierre Cox', '2021-03-31', '2021-06-05'),
        ('0c9d9f98-c90a-459d-af35-0ff5c2105200', 'Natrix', 'https://images.unsplash.com/photo-1623266932500-f3a126bbefff?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
        'Sapien faucibus et molestie ac feugiat sed lectus vestibulum mattis. At erat pellentesque adipiscing commodo elit at. Purus non enim praesent elementum facilisis. Viverra vitae congue eu consequat ac felis donec et.',
        'Marley Allen, Alden Cantrell, Johnathon Fletcher, Konner Villegas', '1999-08-25', '2021-06-07'),
        ('0c9d9f98-c90a-459d-af35-0ff5c2105300', 'Teeth', 'https://images.unsplash.com/photo-1622567846263-862299c39f99?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
        'Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula. Faucibus vitae aliquet nec ullamcorper. Tortor vitae purus faucibus ornare suspendisse sed nisi. Cursus in hac habitasse platea dictumst quisque.',
        'Davon Mercado, Marley Allen, Alyssa Jimenez', '1975-01-20', '2021-06-08'),
        ('0c9d9f98-c90a-459d-af35-0ff5c2105400', 'The City', 'https://images.unsplash.com/photo-1623330794959-380e0039243d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
        'Euismod in pellentesque massa placerat duis ultricies lacus. Viverra ipsum nunc aliquet bibendum. Bibendum ut tristique et egestas quis ipsum. Turpis egestas maecenas pharetra convallis. Nulla facilisi morbi tempus iaculis urna id volutpat.',
        'Kyra Moon, Lance Doyle, Alexandra Snyder, Sergio Watson', '2013-04-10', '2021-06-09'),
        ('0c9d9f98-c90a-459d-af35-0ff5c2105100', 'Revengers - Start Game', 'https://images.unsplash.com/photo-1622367708699-2ae3c6454b93?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
        'Integer malesuada nunc vel risus commodo viverra maecenas accumsan. Donec massa sapien faucibus et molestie ac. Aliquam ut porttitor leo a diam sollicitudin tempor id. Et ultrices neque ornare aenean euismod elementum nisi quis. Nibh venenatis cras sed felis eget velit aliquet. ',
        'Thomas Crane, Miranda Shaffer, Bradyn Kramer, Alvaro Mcgee', '2019-07-15', '2021-06-04');

INSERT INTO role (id, name) VALUES
('e37f1daf-49c6-4ac1-bd1c-71056e224537', 'USER'),
('af4abdf2-9ba9-11eb-a8b3-0242ac130799', 'ADMIN');

INSERT INTO user (id, username, password) VALUES
    ('af4abdf2-9ba9-11eb-a8b3-0242ac130799', 'admin', '{bcrypt}$2y$12$jTtuvT/AazGVykRoiOP8JOQmoCsYrk.QpwpaVKVreNWJZhTDvMJom'), --admin
    ('af4abdf2-9ba9-11eb-a8b3-0242ac130111', 'user', '{bcrypt}$2y$12$dVmx09FiZcWBf2kE3mRRgO4DVeC0wdVZHLKH/aDrCiaKz/80AWAJC'), --pass
    ('af4abdf2-9ba9-11eb-a8b3-0242ac130333', 'vartotojas', '{bcrypt}$2y$12$dVmx09FiZcWBf2kE3mRRgO4DVeC0wdVZHLKH/aDrCiaKz/80AWAJC'), --pass
    ('af4abdf2-9ba9-11eb-a8b3-0242ac130222', 'another', '{bcrypt}$2y$12$dVmx09FiZcWBf2kE3mRRgO4DVeC0wdVZHLKH/aDrCiaKz/80AWAJC'); --pass

INSERT INTO user_roles (user_id, roles_id) VALUES
('af4abdf2-9ba9-11eb-a8b3-0242ac130799', 'af4abdf2-9ba9-11eb-a8b3-0242ac130799'),
('af4abdf2-9ba9-11eb-a8b3-0242ac130799', 'e37f1daf-49c6-4ac1-bd1c-71056e224537'),
('af4abdf2-9ba9-11eb-a8b3-0242ac130333', 'e37f1daf-49c6-4ac1-bd1c-71056e224537'),
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
     '2021-06-14', 6),
    ('af4abdf2-9ba9-11eb-a8bc-2242ac000799', 'af4abdf2-9ba9-11eb-a8b3-0242ac130333', '0c9d9f98-c90a-459d-af35-0ff5c2105100',
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
     '2021-06-04', 10),
    ('af4abdf2-9ba9-11eb-a8bc-1002ac220799', 'af4abdf2-9ba9-11eb-a8b3-0242ac130333', '0c9d9f98-c90a-459d-af35-0ff5c2105200',
     'Vitae sapien pellentesque habitant morbi tristique senectus.',
     'Malesuada fames ac turpis egestas integer eget aliquet. Varius morbi enim nunc faucibus a pellentesque sit amet porttitor. Vel quam elementum pulvinar etiam. Mi proin sed libero enim sed faucibus turpis. Orci sagittis eu volutpat odio facilisis mauris sit amet massa.',
     '2021-06-11', 6),
    ('af4abdf2-9ba9-11eb-a8bc-2002ac220799', 'af4abdf2-9ba9-11eb-a8b3-0242ac130222', '0c9d9f98-c90a-459d-af35-0ff5c2105200',
     'Et netus et malesuada fames ac turpis.',
     'Eu volutpat odio facilisis mauris sit amet massa. Risus commodo viverra maecenas accumsan lacus. Aliquam sem et tortor consequat. Ornare arcu odio ut sem nulla pharetra. Maecenas ultricies mi eget mauris pharetra et.',
     '2021-06-09', 7),
    ('af4abdf2-9ba9-11eb-a8bc-3002ac220799', 'af4abdf2-9ba9-11eb-a8b3-0242ac130222', '0c9d9f98-c90a-459d-af35-0ff5c2105300',
     'Dignissim suspendisse in est ante in nibh.',
     'Ornare massa eget egestas purus viverra accumsan in. Faucibus vitae aliquet nec ullamcorper sit. Convallis tellus id interdum velit laoreet id donec ultrices. Facilisis sed odio morbi quis commodo odio. Mi eget mauris pharetra et. Nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus.',
     '2021-06-13', 9),
    ('af4abdf2-9ba9-11eb-a8bc-4002ac220799', 'af4abdf2-9ba9-11eb-a8b3-0242ac130333', '0c9d9f98-c90a-459d-af35-0ff5c2105400',
     'Faucibus a pellentesque sit amet porttitor eget dolor.',
     'Integer vitae justo eget magna fermentum. Neque convallis a cras semper. Velit egestas dui id ornare. Mauris pharetra et ultrices neque. Habitasse platea dictumst quisque sagittis purus sit amet. Netus et malesuada fames ac turpis egestas integer eget aliquet.',
     '2021-06-12', 4),
    ('af4abdf2-9ba9-11eb-a8bc-5002ac220799', 'af4abdf2-9ba9-11eb-a8b3-0242ac130222', '0c9d9f98-c90a-459d-af35-0ff5c2105400',
     'Amet commodo nulla facilisi nullam vehicula ipsum a.',
     'Arcu non odio euismod lacinia at quis risus sed vulputate. Semper auctor neque vitae tempus quam pellentesque. Ultricies mi quis hendrerit dolor magna eget est. Congue eu consequat ac felis donec et odio pellentesque.',
     '2021-06-11', 6),
    ('af4abdf2-9ba9-11eb-a8bc-6002ac220799', 'af4abdf2-9ba9-11eb-a8b3-0242ac130111', '0c9d9f98-c90a-459d-af35-0ff5c2105400',
     'Tellus integer feugiat scelerisque varius morbi enim nunc faucibus a.',
     'Massa vitae tortor condimentum lacinia quis vel eros donec ac. Sed nisi lacus sed viverra tellus in. Habitasse platea dictumst quisque sagittis purus sit amet. Urna nec tincidunt praesent semper feugiat nibh sed pulvinar. In eu mi bibendum neque egestas. Pretium nibh ipsum consequat nisl vel.',
     '2021-06-14', 7);