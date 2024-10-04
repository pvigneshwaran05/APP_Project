--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: quiz; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quiz (
    id integer NOT NULL,
    question text,
    optiona text,
    optionb text,
    optionc text,
    optiond text,
    correct character(2)
);


ALTER TABLE public.quiz OWNER TO postgres;

--
-- Name: quiz_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.quiz_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.quiz_id_seq OWNER TO postgres;

--
-- Name: quiz_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.quiz_id_seq OWNED BY public.quiz.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(50) NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(50),
    score integer,
    blog integer
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: quiz id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz ALTER COLUMN id SET DEFAULT nextval('public.quiz_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: quiz; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.quiz (id, question, optiona, optionb, optionc, optiond, correct) FROM stdin;
1	Which of the following is NOT a form of energy?	Solar energy	Wind energy	Nuclear energy	Magnetic energy	d 
2	Which of the following appliances typically consumes the most energy in a household?	Microwave oven	Television	Refrigerator	LED light bulb	c 
3	What is the primary purpose of energy conservation?	To reduce pollution	To increase energy production	To minimize energy costs	To promote economic growth	c 
4	Which of the following actions contributes to energy conservation?	Leaving lights and electronics on when not in use	Using incandescent light bulbs instead of LED bulbs	Unplugging chargers and devices when not in use	Setting the thermostat to a higher temperature in summer	c 
5	Which type of energy-efficient appliance is designed to automatically adjust its power usage based on demand?	Smart refrigerator	Energy Star-certified dishwasher	Programmable thermostat	Compact fluorescent lamp (CFL)	a 
6	What is the main benefit of using renewable energy sources for electricity generation?	They are cheaper than fossil fuels	They produce fewer greenhouse gas emissions	They are more reliable than conventional sources	They require less maintenance	b 
7	Which of the following transportation methods is most energy-efficient for short distances?	Bicycle	Car	Bus	Train	a 
8	What is the term used to describe the process of capturing and reusing waste heat to generate electricity?	Solar power	Geothermal energy	Cogeneration	Hydroelectricity	c 
9	How can planting trees contribute to energy conservation?	Trees absorb carbon dioxide emissions	Trees produce renewable biomass energy	Trees reduce the need for air conditioning	Trees increase wind energy production	c 
10	Which organization sets energy efficiency standards for appliances and equipment in the United States?	Environmental Protection Agency (EPA)	Department of Energy (DOE)	Federal Energy Regulatory Commission (FERC)	Occupational Safety and Health Administration (OSHA)	b 
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, username, password, score, blog) FROM stdin;
4	123@123	HIM	123	3	\N
5	prithvin@prithvin	Prithvin	123	1	\N
7	123@123.com	pranav	123	2	\N
8	123@13	qwe123	123	\N	\N
6	123@123	Pranav	123	0	\N
\.


--
-- Name: quiz_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.quiz_id_seq', 10, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 8, true);


--
-- Name: quiz quiz_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz
    ADD CONSTRAINT quiz_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- PostgreSQL database dump complete
--

