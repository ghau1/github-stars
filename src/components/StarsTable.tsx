import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Table } from 'antd';

import { usePagination } from '../hooks/usePagination';
import './StarsTable.css';

const REPOS_QUERY = gql`
  query SearchReactRepos($after: String, $before: String) {
    search(
      query: "topic:react sort:stars"
      type: REPOSITORY
      last: 10
      after: $after
      before: $before
    ) {
      pageInfo {
        startCursor
        hasNextPage
        hasPreviousPage
        endCursor
      }
      repositoryCount
      edges {
        node {
          ... on Repository {
            name
            stargazerCount
            forkCount
            url
          }
        }
      }
    }
  }
`;

interface RowData {
  key: string;
  name: string;
  stars: number;
  forks: number;
  url: string;
}

export default function StarsTable() {
  const [dataSource, setDataSource] = useState([]);
  const { beforeCursor, afterCursor, handlePageChange } = usePagination();

  const { loading, data } = useQuery(REPOS_QUERY, {
    variables: {
      after: afterCursor,
      before: beforeCursor,
    },
  });

  useEffect(() => {
    setDataSource(
      data?.search?.edges?.map((edge: any) => ({
        key: edge.node.url,
        name: edge.node.name,
        forks: edge.node.forkCount,
        stars: edge.node.stargazerCount,
        url: edge.node.url,
      })) ?? []
    );
  }, [data]);

  const { pageInfo = {} } = data?.search ?? {};
  const { startCursor, endCursor } = pageInfo;

  const columns = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
      render: (text: String, record: RowData) => <a href={record.url}>{text}</a>,
    },
    {
      title: 'Stars',
      key: 'stars',
      dataIndex: 'stars',
    },
    {
      title: 'Forks',
      key: 'forks',
      dataIndex: 'forks',
    },
  ];

  return (
    <Table
      data-testid="stars-table"
      className="Stars-Table"
      dataSource={dataSource}
      columns={columns}
      loading={loading}
      pagination={{
        simple: true,
        total: data?.search?.repositoryCount,
        onChange: newPage =>
          handlePageChange({ newPage, startCursor, endCursor }),
      }}
    />
  );
}
