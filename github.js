const github = require('github-api')

const gh = new github({
    token: process.env.GH_API
})

gh.getUser('Gcat101').listRepos().then(p => {
    p.data.forEach(el => {
        if (el.name.match(/this-repo-has-\d*-stars/)) {
            repo = gh.getRepo('Gcat101', el.name)

            repo.updateRepository({name: `this-repo-has-${el.stargazers_count}-stars`})

            readme = `# this-repo-has-${el.stargazers_count}-stars

${1000 - el.stargazers_count} stars until 1000!

## What?

Welcome to a dynamic repo that updates everytime someone stars it (not really)

## How?

Simple NodeJs and some Firebase

## Why?

Because it looks cool!

## Can you do more?

yes but i'm lazy`
            repo.writeFile('master', 'README.md', readme, `${el.stargazers_count} stars!`)
        }
    })
})