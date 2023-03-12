export type GitLabUser = {
  id: string,
  name: string,
  username: string,
  email: string,
  profile: string,
  picture: string,
  lastActivityOn?: string,
}

export type GitLabGroup = {
  id: number
  name: string
  webUrl: string
  avatarUrl?: string
  fullPath: string
  projects: GitLabProject[],
  projectCount: number
}

export type GitLabProject = {
  id: number
  name: string
  webUrl: string
  lastActivityAt: string
  avatarUrl?: string
  fullPath: string
  lastCommit?: {
    date: string
    author: {
      name: string
      username: string
      avatarUrl: string
    }
  }
}

export type GitLabActivity = {
  push_data: any
  target_title: any
  action_name: any
  id: number
  action: string
  commit_title: string
  created_at: string
}