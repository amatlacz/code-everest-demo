# AI in Coding Bug Tracker 🧠

Welcome to the **AI in Coding Bug Tracker**, a community-driven, open-source bug tracking system designed to help developers conquer software challenges with ease! Whether you're a solo coder or part of a team, this tool empowers you to log, track, and resolve bugs efficiently, all while leveraging the power of AI to enhance your workflow. Born from the "AI in Coding: Let AI Be Your Sherpa" workshop, this project is now a living, breathing effort fueled by contributors worldwide.

> **Note**: This system is under active development! New features are being added by the community on a daily basis. Join us to summit bugs together! 🚀

## 📋 Project Description

The AI in Coding Bug Tracker is a modern web application built to streamline the bug management process. Imagine a tool that not only lets you log and track issues but also harnesses AI to provide intelligent insights—like spotting duplicate bugs, suggesting fixes, or summarizing complex issues in a snap. With a clean, responsive interface and seamless database integration, this tracker is designed to help you navigate the rocky terrain of software development. We use Supabase for robust data management and integrate with LLMs (like Perplexity or ChatGPT) for AI-driven features, all powered by a cutting-edge tech stack. Our community is constantly evolving the system, and we’d love for you to contribute to the ascent!

## 🛠️ Technologies Used

This project is built with the following technologies:

- **Next.js 15** - React framework for production-ready web applications.  
- **React 19** - JavaScript library for building dynamic user interfaces.  
- **TypeScript** - Typed superset of JavaScript for safer, more maintainable code.  
- **Tailwind CSS** - Utility-first CSS framework for rapid, responsive styling.  
- **Geist Font** - Modern font family optimized for readability and aesthetics.  
- **Supabase** - Open-source backend-as-a-service for database integration and real-time features.  
- **Vercel** - Cloud infrastructure for seamless deployment and hosting.

## 🌟 Planned Features

The AI in Coding Bug Tracker is designed to be a powerful ally in your development journey. Here’s a look at the features we’re planning to bring to life, blending core bug tracking capabilities with AI-driven enhancements. As a new contributor, we suggest picking *one foundational feature* (like logging or listing bugs) to get started, and *one feature that excites you* (like AI-powered suggestions) to add to the MVP. Once you’ve summited those peaks, feel free to explore the remaining features at your own pace and contribute to the project’s growth!

- **Log Bugs with Ease**: Submit new bugs with a title, detailed description, and severity level (Low, Medium, High, or Critical). This ensures every issue is captured with the right context, making it easier to tackle problems systematically. We store this data in a Supabase table (`bugs`), with fields for `title`, `description`, `severity`, and `created_at`, accessible via a simple form in the Next.js app. It’s the cornerstone of any bug tracker, inspired by tools like ClickUp, ensuring you have all the details you need to start debugging.

- **View and Sort Bugs**: See all your bugs in a clean table, displaying their title, severity, and status. Need to focus on the most urgent issues? Sort the list by severity (e.g., Critical to Low) with a single click. We fetch the data from Supabase and render it dynamically in Next.js, with sorting handled either client-side or via a Supabase query (`order by severity`). This feature, common in trackers like Zoho BugTracker, helps you prioritize and manage your workload efficiently.

- **Track Bug Progress**: Update the status of each bug (Open, In Progress, or Closed) to reflect where it stands in the resolution process. On the bug detail page, a dropdown or set of buttons lets you change the status, which is then updated in the `bugs` table in Supabase. This mirrors the defect lifecycle management found in systems like Kissflow, giving you a clear view of progress as you work through your bug backlog.

- **AI-Powered Duplicate Detection**: Avoid redundancy with AI-driven duplicate detection. When you log a new bug, an LLM compares its description to existing bugs in the `bugs` table, using a prompt like, “Compare this bug description with others and identify potential duplicates.” If a match is found, you’ll get a warning with links to similar bugs. Inspired by Bugzilla’s approach, this feature combines Supabase queries with LLM integration to keep your bug list clean and focused.

- **Visualize Bug Trends with a Dashboard**: Get a high-level overview with a dashboard that shows stats like the number of bugs by status, severity, and assignee. We use Supabase to aggregate data from the `bugs` table and display it with charts (powered by Chart.js) on a dedicated page in the Next.js app. Similar to Zoho BugTracker’s real-time dashboards, this feature helps you spot trends and prioritize tasks at a glance.

- **AI-Generated Bug Tags**: Automatically categorize bugs with tags like “UI,” “Backend,” or “Critical” using an LLM. When a bug is submitted, its description is sent to the LLM with a prompt like, “Generate 1-3 tags for this bug description.” The tags are stored in a `tags` field in the `bugs` table and displayed on the bug list and detail pages. This feature, inspired by ClickUp’s tagging system, makes it easier to organize and search for issues.

- **AI-Suggested Fixes**: Get a head start on debugging with AI-suggested fixes. Click a button on the bug detail page to send the bug’s description (and any error messages) to an LLM with a prompt like, “Suggest debugging steps or fixes for this bug.” The LLM’s response is displayed below the bug details, offering actionable insights. This mirrors real-world AI-powered features in bug tracking software, making problem-solving faster and more efficient.

- **Collaborate with Comments**: Foster teamwork by adding comments to bugs. A dedicated comment section on each bug’s detail page lets users post and view discussions, stored in a `comments` table in Supabase with fields like `bug_id`, `user_id`, `comment_text`, and `created_at`. Inspired by ClickUp’s collaboration features, this ensures your team can discuss issues and share insights in one place.

- **Assign Bugs to Team Members**: Improve accountability by assigning bugs to specific team members. Select a user from a dropdown when logging or editing a bug, linking the bug to a user via an `assigned_to` field in the `bugs` table. User data (e.g., name, email) is stored in a `users` table in Supabase. This feature, common in tools like Zoho BugTracker, enhances team collaboration and ensures everyone knows their responsibilities.

- **AI-Generated Bug Summaries**: Quickly grasp the essence of a bug with AI-generated summaries. When a bug is logged, its description is sent to an LLM (e.g., Perplexity) with a prompt like, “Summarize this bug description in 1-2 sentences.” The summary is stored in the `bugs` table and displayed alongside the bug details, making it easier to understand issues at a glance. This leverages LLM capabilities to enhance usability, aligning with our AI-driven vision.

## 🤝 Contributing

We welcome contributions from the community! Whether you're adding new features, fixing bugs, or improving documentation, your efforts help us summit the AI in Coding workshop together. To get started:

1. Fork the repository.
2. Clone your fork: `git clone https://github.com/amatlacz/code-everest-demo.git`
3. Install dependencies: `npm install`
4. Run the development server: `npm run dev`
5. Create a branch for your feature: `git checkout -b feature-name`
6. Make your changes and commit: `git commit -m "Add feature-name"`
7. Push to your fork: `git push origin feature-name`
8. Open a pull request with a clear description of your changes.

For more details, check our [CONTRIBUTING.md](CONTRIBUTING.md) (coming soon!).

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 📬 Contact

Have questions or ideas? Reach out to the community via GitHub Issues, or contact the project maintainer, Adam Matłacz, at [adam@quare.dev](mailto:adam@quare.dev).

---

*Let’s summit those bugs together! 🧠*
