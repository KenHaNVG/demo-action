import * as core from '@actions/core'
import * as github from '@actions/github'

async function run(): Promise<void> {
  try {
    const number: string = core.getInput('PullRequestNumber')
    const token: string = core.getInput('GITHUB_TOKEN')
    const octokit = github.getOctokit(token)

    const {data: pullRequest} = await octokit.rest.pulls.get({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      pull_number: +number,
      mediaType: {
        format: 'diff'
      }
    })

    core.setOutput('pullRequestNumber', pullRequest.number)
    core.setOutput('pullRequestState', pullRequest.state)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
