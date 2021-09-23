export type searchResultType = {
  node: {
    description: string;
    id: string;
    languages: {
      nodes: [
        {
          color: string;
          name: string;
        }
      ];
    };
    name: string;
    owner: {
      avatarUrl: string;
      login: string;
    };
    stargazerCount: number;
  };
};
