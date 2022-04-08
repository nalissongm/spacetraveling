import { GetStaticProps } from 'next';
import Prismic from '@prismicio/client';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { FiCalendar, FiUser } from 'react-icons/fi';
import Link from 'next/link';

// import { useEffect, useState } from 'react';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  slug?: string; // Caso dê problema, volvar valor para: uid
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps): JSX.Element {
  console.log(postsPagination);
  return (
    <>
      <header className={`${styles.headerContainer}`}>
        <div className={`${styles.headerContent} ${commonStyles.Content}`}>
          <Link href="/">
            <a>
              <img src="/images/Logo.svg" alt="log" />
            </a>
          </Link>
        </div>
      </header>
      <main className={`${styles.Container}`}>
        <div className={styles.posts}>
          {postsPagination?.results.map(post => (
            <Link href={`/post/${post.slug}`} key={post.slug}>
              <a>
                <strong>{post.data.title}</strong>
                <p>{post.data.subtitle}</p>
                <div className={styles.info}>
                  <span className={styles.createdAt}>
                    <FiCalendar />
                    <time>{post.first_publication_date}</time>
                  </span>
                  <span className={styles.author}>
                    <FiUser />
                    <span>{post.data.author}</span>
                  </span>
                </div>
              </a>
            </Link>
          ))}
          {!!postsPagination?.next_page && (
            <button type="button">Carregar mais posts</button>
          )}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async contexst => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      fetch: ['posts.title', 'posts.subtitle', 'posts.author'],
      pageSize: 100,
    }
  );

  const posts = postsResponse.results.map(post => {
    return {
      slug: post.uid,
      first_publication_date: format(
        new Date(post.first_publication_date),
        "'Hoje é' eeee",
        {
          locale: ptBR,
        }
      ),
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });

  const postPagination = {
    next_page: postsResponse.next_page,
    results: posts,
  };

  return {
    props: {
      postPagination,
    },
  };
};
