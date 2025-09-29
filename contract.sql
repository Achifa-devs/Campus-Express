--
-- PostgreSQL database dump
--

-- Dumped from database version 15.13 (2e2a537)
-- Dumped by pg_dump version 16.9

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
-- Name: blocks; Type: TABLE; Schema: public; Owner: achifa.io.llc
--

CREATE TABLE public.blocks (
    number integer NOT NULL,
    hash character(66) NOT NULL,
    tx_count integer NOT NULL
);


ALTER TABLE public.blocks OWNER TO "achifa.io.llc";

--
-- Name: transactions; Type: TABLE; Schema: public; Owner: achifa.io.llc
--

CREATE TABLE public.transactions (
    block_number integer NOT NULL,
    hash character(66) NOT NULL,
    "from" character(200) NOT NULL,
    "to" character(200),
    amount numeric NOT NULL,
    nonce integer NOT NULL
);


ALTER TABLE public.transactions OWNER TO "achifa.io.llc";

--
-- Data for Name: blocks; Type: TABLE DATA; Schema: public; Owner: achifa.io.llc
--

COPY public.blocks (number, hash, tx_count) FROM stdin;
\.


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: achifa.io.llc
--

COPY public.transactions (block_number, hash, "from", "to", amount, nonce) FROM stdin;
\.


--
-- Name: blocks blocks_pkey; Type: CONSTRAINT; Schema: public; Owner: achifa.io.llc
--

ALTER TABLE ONLY public.blocks
    ADD CONSTRAINT blocks_pkey PRIMARY KEY (number);


--
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: achifa.io.llc
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (hash);


--
-- Name: transactions unique_hash; Type: CONSTRAINT; Schema: public; Owner: achifa.io.llc
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT unique_hash UNIQUE (hash);


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

