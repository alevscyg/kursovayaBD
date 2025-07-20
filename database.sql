CREATE TABLE IF NOT EXISTS public.musicians
(
    id integer NOT NULL DEFAULT nextval('musicians_id_seq'::regclass),
    musician character varying(255) COLLATE pg_catalog."default" NOT NULL,
    release_of_artist_year smallint NOT NULL,
    CONSTRAINT musicians_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.musicians
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.songs
(
    id integer NOT NULL DEFAULT nextval('songs_id_seq'::regclass),
    song_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    album character varying(255) COLLATE pg_catalog."default",
    genre character varying(100) COLLATE pg_catalog."default" NOT NULL,
    release_year smallint NOT NULL,
    song_rating smallint NOT NULL,
    musician_id integer NOT NULL,
    CONSTRAINT songs_pkey PRIMARY KEY (id),
    CONSTRAINT musicians_id FOREIGN KEY (musician_id)
        REFERENCES public.musicians (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.songs
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.awards_of_songs
(
    id integer NOT NULL DEFAULT nextval('awards_of_songs_id_seq'::regclass),
    song_id integer NOT NULL,
    award character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT awards_of_songs_pkey PRIMARY KEY (id),
    CONSTRAINT song_id FOREIGN KEY (song_id)
        REFERENCES public.songs (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.awards_of_songs
    OWNER to postgres;