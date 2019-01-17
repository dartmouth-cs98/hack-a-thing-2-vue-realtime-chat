# Hackathon 2
## Description/what's this supposed to be?
I scrapped large portions of the previous hackathon project (mostly the Couch/PouchDB part) and was left with bare 
sign-in functionality on the frontend. That's it. I've always liked the idea of *anonymous* social networks (that 
doesn't suck) and this was actually what I was working towards in the previous week. So this is supposed to be a mix 
of chat apps (think Slack) and "old-skewl" BBS boards (yes, really), where you can sign in with just your name (the 
way this works in this project is actually really clever, more in a bit), browse sub-forums/topics (the topics can be
 nested, so you could have something like `Dartmouth/CS98/general` as a sub-forum), and posts in any particular topic. Then, if you click on a post, you can comment on it and see realtime updates.
 
For user identity, it takes your username (say, `Greg`) and appends some hash to it to differentiate you from another
 person that possibly has the same username. That hash (and the password) is calculated from your browser fingerprint
  to only allow 
 *you* to sign in with that particular username+hash combo, for identity protection. Additionally, I was planning to 
 add spam filtering via ReCAPTCHA v3, which can score individuals from 0 to 1 on how likely they are to be 
 spammers/bots. Then, I could filter out posts & comments of people who have very low scores when a "normal" user 
 views a topic/post, so that they wouldn't be exposed to the flaming trashcan that is 4chan.

So far I've implemented some frontend skeleton to allow auto-updating, ordering, refreshing, etc., the logic in the 
backend (database logic/models/controllers/server config), except (at the time of writing this) I'm still stuck 
trying to get server-side GraphQL schemas/resolvers/subscriptions work. Speaking of which...

## What I tried to learn
One of the things I tried to learn this time was GraphQL. Sure, the logic in the backend is the same no matter the 
delivery method (traditional REST API + websockets vs. a single GraphQL endpoint), but I was lured by that sweet, 
sweet "integration" in the front-end (especially since I *still* wasn't comfortable with Vue yet) with Vue via 
`apollo-vue`, where it would be able to manage all of the nitty gritty bits for me.

Also, I learned just the bare minimum to get Vue up and running last time, so I tried to learn more of the framework 
+ the ecosystem around it to really modernize my frontend "skillz".

Finally, I tried something different with the data layer this time - I learned to create & maintain & sort 
hierarchies (everything so far has been flat, normalized) *and* I learned to do fulltext search (with Postgres, so 
that I 
wouldn't have to maintain yet another search engine).

## How is this related to possible group project idea?
Well, I doubt any team's going to build this exactly - an anonymous BBS board/forum/social network/whatever. But a 
lot of this is transferrable - frontend structure, data modeling, building APIs, etc. In fact, I plan to call dibs on
 the server side of things (and use these - or if I can't get graphql & frontend working by the time I submit this, 
 minus Vue/GraphQL - I'll stick with jQuery and REST) and mostly be able to copy over the skeleton to really speed up
  server development.

## What didn't work
A lot of the frontend & networking layer just takes so much time to learn, that I didn't get to finish those parts. 

Not to mention, I foolishly decided to make the data layer fairly complex, and I spent way, *way* too much time 
thinking 
about how to model the data/figuring out data access patterns that it took away most of my time. I'm so stupid.

## Lessons learned
Next time someone asks you to make MVP, make it as basic as possible, *and* work on one feature at a time. i.e. 
instead of figuring out the whole backend/data layer first and then trying to shoehorn in API & frontend, try adding 
*just* the user & identity management features in the backend, then build the API for just that, and then build the 
frontend for just that. Then iterate as I make more features. That is how I should approach the project instead of 
this...

Also, Vue takes a lot of time to learn. So does GraphQL. But the ecosystem around it? So, so much worse (in terms of 
time taken to learn), so really set aside time for those the next time.

## Credits
The good parts: Sungil Ahn
The bad parts: Sungil Ahn
The ugly parts: Sungil Ahn
