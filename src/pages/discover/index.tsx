import CardsWrapper from "@/components/Cards/CardsWrapper";
import AppLayout from "@/components/layout/AppLayout";
import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";

const DiscoverPage = () => {
  const [cards, setCards] = useState(
    Array(10)
      .fill(dummy)
      .map((item, index) => ({
        ...item,
        repo: {
          ...item.repo,
          id: item.repo.id + index,
        },
      }))
  );
  return (
    <AnimatePresence>
      <div className="flex w-screen absolute  h-[100dvh]  items-center justify-center overflow-x-hidden">
        <CardsWrapper cards={cards} setCards={setCards} />
      </div>
    </AnimatePresence>
  );
};

export default DiscoverPage;
DiscoverPage.Layout = AppLayout;

const dummy: AppRepo = {
  contributionGuidelines: "There are the guidlines",
  description: "This is a description",
  difficulty: "easy",
  repo: {
    id: 511945018,
    node_id: "R_kgDOHoOpOg",
    name: "ArcadeGamingZone-Java-JFrame-project",
    full_name: "mubashiralikalhoro/ArcadeGamingZone-Java-JFrame-project",
    private: false,
    owner: {
      login: "mubashiralikalhoro",
      id: 108943166,
      node_id: "U_kgDOBn5XPg",
      avatar_url: "https://avatars.githubusercontent.com/u/108943166?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/mubashiralikalhoro",
      html_url: "https://github.com/mubashiralikalhoro",
      followers_url: "https://api.github.com/users/mubashiralikalhoro/followers",
      following_url: "https://api.github.com/users/mubashiralikalhoro/following{/other_user}",
      gists_url: "https://api.github.com/users/mubashiralikalhoro/gists{/gist_id}",
      starred_url: "https://api.github.com/users/mubashiralikalhoro/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/mubashiralikalhoro/subscriptions",
      organizations_url: "https://api.github.com/users/mubashiralikalhoro/orgs",
      repos_url: "https://api.github.com/users/mubashiralikalhoro/repos",
      events_url: "https://api.github.com/users/mubashiralikalhoro/events{/privacy}",
      received_events_url: "https://api.github.com/users/mubashiralikalhoro/received_events",
      type: "User",
      user_view_type: "public",
      site_admin: false,
    },
    html_url: "https://github.com/mubashiralikalhoro/ArcadeGamingZone-Java-JFrame-project",
    description:
      "JAVA GUI OOP project for unversity, this project is made in ide netbeans and contains jframe gui in it . Ucanaccess is used as database in this project",
    fork: false,
    url: "https://api.github.com/repos/mubashiralikalhoro/ArcadeGamingZone-Java-JFrame-project",
    forks_url: "https://api.github.com/repos/mubashiralikalhoro/ArcadeGamingZone-Java-JFrame-project/forks",
    keys_url:
      "https://api.github.com/repos/mubashiralikalhoro/ArcadeGamingZone-Java-JFrame-project/keys{/key_id}",
    collaborators_url:
      "https://api.github.com/repos/mubashiralikalhoro/ArcadeGamingZone-Java-JFrame-project/collaborators{/collaborator}",
    teams_url: "https://api.github.com/repos/mubashiralikalhoro/ArcadeGamingZone-Java-JFrame-project/teams",
    hooks_url: "https://api.github.com/repos/mubashiralikalhoro/ArcadeGamingZone-Java-JFrame-project/hooks",
    issue_events_url:
      "https://api.github.com/repos/mubashiralikalhoro/ArcadeGamingZone-Java-JFrame-project/issues/events{/number}",
    events_url: "https://api.github.com/repos/mubashiralikalhoro/ArcadeGamingZone-Java-JFrame-project/events",
    assignees_url:
      "https://api.github.com/repos/mubashiralikalhoro/ArcadeGamingZone-Java-JFrame-project/assignees{/user}",
    branches_url:
      "https://api.github.com/repos/mubashiralikalhoro/ArcadeGamingZone-Java-JFrame-project/branches{/branch}",
    tags_url: "https://api.github.com/repos/mubashiralikalhoro/ArcadeGamingZone-Java-JFrame-project/tags",
    blobs_url:
      "https://api.github.com/repos/mubashiralikalhoro/ArcadeGamingZone-Java-JFrame-project/git/blobs{/sha}",
    git_tags_url:
      "https://api.github.com/repos/mubashiralikalhoro/ArcadeGamingZone-Java-JFrame-project/git/tags{/sha}",
    git_refs_url:
      "https://api.github.com/repos/mubashiralikalhoro/ArcadeGamingZone-Java-JFrame-project/git/refs{/sha}",
    trees_url:
      "https://api.github.com/repos/mubashiralikalhoro/ArcadeGamingZone-Java-JFrame-project/git/trees{/sha}",
    statuses_url:
      "https://api.github.com/repos/mubashiralikalhoro/ArcadeGamingZone-Java-JFrame-project/statuses/{sha}",
    languages_url:
      "https://api.github.com/repos/mubashiralikalhoro/ArcadeGamingZone-Java-JFrame-project/languages",
    stargazers_url:
      "https://api.github.com/repos/mubashiralikalhoro/ArcadeGamingZone-Java-JFrame-project/stargazers",
    contributors_url:
      "https://api.github.com/repos/mubashiralikalhoro/ArcadeGamingZone-Java-JFrame-project/contributors",
    subscribers_url:
      "https://api.github.com/repos/mubashiralikalhoro/ArcadeGamingZone-Java-JFrame-project/subscribers",
    subscription_url:
      "https://api.github.com/repos/mubashiralikalhoro/ArcadeGamingZone-Java-JFrame-project/subscription",
    commits_url:
      "https://api.github.com/repos/mubashiralikalhoro/ArcadeGamingZone-Java-JFrame-project/commits{/sha}",
    git_commits_url:
      "https://api.github.com/repos/mubashiralikalhoro/ArcadeGamingZone-Java-JFrame-project/git/commits{/sha}",
    comments_url:
      "https://api.github.com/repos/mubashiralikalhoro/ArcadeGamingZone-Java-JFrame-project/comments{/number}",
    issue_comment_url:
      "https://api.github.com/repos/mubashiralikalhoro/ArcadeGamingZone-Java-JFrame-project/issues/comments{/number}",
    contents_url:
      "https://api.github.com/repos/mubashiralikalhoro/ArcadeGamingZone-Java-JFrame-project/contents/{+path}",
    compare_url:
      "https://api.github.com/repos/mubashiralikalhoro/ArcadeGamingZone-Java-JFrame-project/compare/{base}...{head}",
    merges_url: "https://api.github.com/repos/mubashiralikalhoro/ArcadeGamingZone-Java-JFrame-project/merges",
    archive_url:
      "https://api.github.com/repos/mubashiralikalhoro/ArcadeGamingZone-Java-JFrame-project/{archive_format}{/ref}",
    downloads_url:
      "https://api.github.com/repos/mubashiralikalhoro/ArcadeGamingZone-Java-JFrame-project/downloads",
    issues_url:
      "https://api.github.com/repos/mubashiralikalhoro/ArcadeGamingZone-Java-JFrame-project/issues{/number}",
    pulls_url:
      "https://api.github.com/repos/mubashiralikalhoro/ArcadeGamingZone-Java-JFrame-project/pulls{/number}",
    milestones_url:
      "https://api.github.com/repos/mubashiralikalhoro/ArcadeGamingZone-Java-JFrame-project/milestones{/number}",
    notifications_url:
      "https://api.github.com/repos/mubashiralikalhoro/ArcadeGamingZone-Java-JFrame-project/notifications{?since,all,participating}",
    labels_url:
      "https://api.github.com/repos/mubashiralikalhoro/ArcadeGamingZone-Java-JFrame-project/labels{/name}",
    releases_url:
      "https://api.github.com/repos/mubashiralikalhoro/ArcadeGamingZone-Java-JFrame-project/releases{/id}",
    deployments_url:
      "https://api.github.com/repos/mubashiralikalhoro/ArcadeGamingZone-Java-JFrame-project/deployments",
    created_at: "2022-07-08T15:38:25Z",
    updated_at: "2023-12-29T12:02:41Z",
    pushed_at: "2022-07-08T15:48:11Z",
    git_url: "git://github.com/mubashiralikalhoro/ArcadeGamingZone-Java-JFrame-project.git",
    ssh_url: "git@github.com:mubashiralikalhoro/ArcadeGamingZone-Java-JFrame-project.git",
    clone_url: "https://github.com/mubashiralikalhoro/ArcadeGamingZone-Java-JFrame-project.git",
    svn_url: "https://github.com/mubashiralikalhoro/ArcadeGamingZone-Java-JFrame-project",
    homepage: null,
    size: 17101,
    stargazers_count: 0,
    watchers_count: 0,
    language: "Java",
    has_issues: true,
    has_projects: true,
    has_downloads: true,
    has_wiki: true,
    has_pages: false,
    has_discussions: false,
    forks_count: 0,
    mirror_url: null,
    archived: false,
    disabled: false,
    open_issues_count: 0,
    license: null,
    allow_forking: true,
    is_template: false,
    web_commit_signoff_required: false,
    topics: [],
    visibility: "public",
    forks: 0,
    open_issues: 0,
    watchers: 0,
    default_branch: "main",
  },
  technologies: ["Java", "JFrame", "Ucanaccess"],
};
