import { GetStaticProps } from 'next';
import Prismic from '@prismicio/client';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { FiCalendar, FiUser } from 'react-icons/fi';
import Link from 'next/link';

import { useState } from 'react';
import Head from 'next/head';
import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string; // Caso dê problema, volvar valor para: uid
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
  const [postPagination, setPostPagination] =
    useState<PostPagination>(postsPagination);
  const { next_page, results } = postPagination;

  async function newPost(): Promise<void> {
    const response = await fetch(next_page);
    const dataJson = await response.json();

    const newPosts = dataJson.results.map(post => {
      return {
        uid: post.uid,
        first_publication_date: post.first_publication_date,
        data: {
          title: post.data.title,
          subtitle: post.data.subtitle,
          author: post.data.author,
        },
      };
    });

    setPostPagination(posts => {
      return {
        next_page: dataJson.next_page,
        results: [...posts.results, ...newPosts],
      };
    });
  }

  return (
    <>
      <Head>
        <title>Spacetraveling</title>
      </Head>
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
          {results.map(post => (
            <Link href={`/post/${post.uid}`} key={post.uid}>
              <a>
                <strong>{post.data.title}</strong>
                <p>{post.data.subtitle}</p>
                <div className={commonStyles.info}>
                  <span className={styles.createdAt}>
                    <FiCalendar />
                    <time>
                      {format(
                        new Date(post.first_publication_date),
                        'dd LLL yyy',
                        {
                          locale: ptBR,
                        }
                      )}
                    </time>
                  </span>
                  <span className={styles.author}>
                    <FiUser />
                    <span>{post.data.author}</span>
                  </span>
                </div>
              </a>
            </Link>
          ))}
          {!!next_page && (
            <button type="button" onClick={newPost}>
              Carregar mais posts
            </button>
          )}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      fetch: ['posts.title', 'posts.subtitle', 'posts.author'],
      pageSize: 1,
    }
  );

  const posts = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });

  const postsPagination = {
    next_page: postsResponse.next_page,
    results: posts,
  };

  return {
    props: {
      postsPagination,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
