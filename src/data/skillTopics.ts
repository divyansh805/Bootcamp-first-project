export interface SkillTopicLevel {
  level_number: number;
  title: string;
  description: string;
}

export interface SkillRoadmap {
  skill_set_id: number;
  skill_name: string;
  levels: SkillTopicLevel[];
}

export const SKILL_TOPICS_ROADMAP: Record<number, SkillTopicLevel[]> = {
  // 1: Data Structures & Algorithms
  1: [
    { level_number: 1, title: "Time & Space Complexity", description: "Big-O notation, asymptotic analysis, basic array indexing and operations" },
    { level_number: 2, title: "Arrays & Strings", description: "Two-pointer techniques, sliding window patterns, prefix sums, string parsing" },
    { level_number: 3, title: "Linked Lists & Stacks", description: "Singly and doubly linked lists, stack evaluation, monotonic stacks" },
    { level_number: 4, title: "Queues & Hash Tables", description: "Circular queues, deques, hash maps, open addressing vs separate chaining" },
    { level_number: 5, title: "Trees & Traversals", description: "Binary search trees, inorder/preorder/postorder traversals, BFS and DFS" },
    { level_number: 6, title: "Heaps & Sorting", description: "Min/max heaps, priority queues, merge sort, quicksort, topological sorting" },
    { level_number: 7, title: "Graphs & Shortest Path", description: "Adjacency lists, Dijkstra's algorithm, Bellman-Ford, cycle detection" },
    { level_number: 8, title: "Dynamic Programming", description: "Memoization, tabulation, knapsack problems, longest common subsequence" },
    { level_number: 9, title: "Advanced Trees & Disjoint Sets", description: "Trie structures, Segment trees, Union-Find disjoint sets, Fenwick trees" },
    { level_number: 10, title: "Competitive Algorithmic Optimization", description: "Bit manipulation, flow networks, computational geometry, cache-aware code" }
  ],

  // 2: Object-Oriented Programming
  2: [
    { level_number: 1, title: "Classes & Objects", description: "Class definitions, instantiation, state encapsulation, constructors & destructors" },
    { level_number: 2, title: "Encapsulation & Access Modifiers", description: "Public, private, protected scopes, getter/setter safety, immutability" },
    { level_number: 3, title: "Inheritance Hierarchies", description: "Single vs multiple inheritance, base classes, super calls, code reuse" },
    { level_number: 4, title: "Polymorphism & Dynamic Dispatch", description: "Method overriding, virtual method tables, method overloading vs overriding" },
    { level_number: 5, title: "Interfaces & Abstract Classes", description: "Contract definition, multiple interface conformance, partial implementations" },
    { level_number: 6, title: "SOLID Principles (S, O, L)", description: "Single responsibility, open-closed design, Liskov substitution principle" },
    { level_number: 7, title: "SOLID Principles (I, D) & Decoupling", description: "Interface segregation, dependency inversion, dependency injection patterns" },
    { level_number: 8, title: "Creational & Structural Patterns", description: "Factory, Singleton, Builder, Adapter, Decorator, Facade implementation" },
    { level_number: 9, title: "Behavioral Patterns & Concurrency", description: "Observer, Strategy, Command patterns, thread safety in OOP classes" },
    { level_number: 10, title: "Domain-Driven Enterprise Architecture", description: "Aggregate roots, value objects, entities, hexagonal architecture design" }
  ],

  // 3: SQL & Databases
  3: [
    { level_number: 1, title: "Relational Concepts & Basic Queries", description: "SELECT, WHERE filtering, ORDER BY, data types, primary and foreign keys" },
    { level_number: 2, title: "Aggregations & Grouping", description: "COUNT, SUM, AVG, GROUP BY, HAVING filtering, NULL handling semantics" },
    { level_number: 3, title: "Multi-Table JOINs", description: "INNER, LEFT, RIGHT, FULL OUTER JOINs, cross joins, self-joins" },
    { level_number: 4, title: "Subqueries & CTEs", description: "Correlated subqueries, Common Table Expressions, recursive CTE queries" },
    { level_number: 5, title: "Database Normalization (1NF to BCNF)", description: "Eliminating redundancy, functional dependencies, schema decomposition" },
    { level_number: 6, title: "Transactions & ACID Properties", description: "Atomicity, Consistency, Isolation levels, Durability, commit/rollback" },
    { level_number: 7, title: "Indexes & Query Plans", description: "B-Tree indexes, hash indexes, composite indexes, EXPLAIN plan analysis" },
    { level_number: 8, title: "Window Functions & Analytical SQL", description: "ROW_NUMBER, RANK, DENSE_RANK, LEAD, LAG, running totals over partitions" },
    { level_number: 9, title: "Stored Procedures & Triggers", description: "PL/pgSQL scripting, database triggers, views, materialized view refreshes" },
    { level_number: 10, title: "Query Optimization & Sharding", description: "Partitioning strategies, connection pooling, deadlock resolution, read replicas" }
  ],

  // 4: Cloud Fundamentals (AWS/Azure)
  4: [
    { level_number: 1, title: "Cloud Computing Paradigms", description: "IaaS vs PaaS vs SaaS, cloud benefits, shared responsibility model" },
    { level_number: 2, title: "Core Compute Services", description: "Virtual machines (EC2/Azure VM), instance sizing, lifecycle management" },
    { level_number: 3, title: "Object & Block Storage", description: "S3 buckets, Azure Blob storage, lifecycle policies, EBS volumes" },
    { level_number: 4, title: "Virtual Private Networks & Subnets", description: "VPC/VNet architecture, public vs private subnets, internet gateways" },
    { level_number: 5, title: "Identity & Access Management (IAM)", description: "Role-based access, least privilege policies, MFA, service principals" },
    { level_number: 6, title: "Managed Databases in the Cloud", description: "RDS, Aurora, Azure SQL, automated backups, multi-AZ high availability" },
    { level_number: 7, title: "Serverless & Function Computing", description: "AWS Lambda, Azure Functions, event triggers, cold start mitigation" },
    { level_number: 8, title: "Load Balancing & Auto Scaling", description: "Application Load Balancers, health checks, scaling policies, cloud monitoring" },
    { level_number: 9, title: "Infrastructure as Code (IaC)", description: "Terraform / CloudFormation basics, declarative provisioning, state drift" },
    { level_number: 10, title: "Cloud Security & Multi-Region Resiliency", description: "WAF configuration, disaster recovery architectures, cross-region replication" }
  ],

  // 5: Operating Systems
  5: [
    { level_number: 1, title: "OS Architecture & Kernel Basics", description: "User mode vs Kernel mode, system calls, hardware abstraction layer" },
    { level_number: 2, title: "Process Life Cycle & States", description: "Process control block (PCB), creation, execution, termination, fork/exec" },
    { level_number: 3, title: "Threads & Multi-Threading", description: "User threads vs kernel threads, thread pools, context switching overhead" },
    { level_number: 4, title: "CPU Scheduling Algorithms", description: "FCFS, SJF, Round Robin, priority scheduling, multilevel feedback queues" },
    { level_number: 5, title: "Process Synchronization", description: "Race conditions, critical sections, mutex locks, semaphores, monitors" },
    { level_number: 6, title: "Deadlock Detection & Prevention", description: "Deadlock conditions, resource allocation graphs, Banker's algorithm" },
    { level_number: 7, title: "Memory Management & Paging", description: "Virtual memory, page tables, TLB, page replacement (LRU, FIFO, Clock)" },
    { level_number: 8, title: "File Systems & Disk I/O", description: "Inodes, directory structures, file allocation methods, disk scheduling" },
    { level_number: 9, title: "Inter-Process Communication (IPC)", description: "Pipes, shared memory, message queues, sockets, signal handling" },
    { level_number: 10, title: "Kernel Internals & Real-Time OS", description: "Device drivers, memory mapping (mmap), RTOS scheduling constraints" }
  ],

  // 6: Computer Networks
  6: [
    { level_number: 1, title: "Network Models (OSI & TCP/IP)", description: "7-layer OSI model vs 4-layer TCP/IP protocol stack responsibilities" },
    { level_number: 2, title: "Physical & Data Link Layers", description: "Ethernet frames, MAC addressing, collision domains, ARP protocol" },
    { level_number: 3, title: "IP Addressing & Subnetting", description: "IPv4 addressing, CIDR notation, subnet masks, private vs public IP spaces" },
    { level_number: 4, title: "Routing Protocols & NAT", description: "Static vs dynamic routing, OSPF, BGP basics, Network Address Translation" },
    { level_number: 5, title: "Transport Layer Protocols", description: "TCP 3-way handshake, termination, UDP characteristics, socket endpoints" },
    { level_number: 6, title: "Flow & Congestion Control", description: "Sliding window protocol, TCP Reno, slow start, fast retransmit/recovery" },
    { level_number: 7, title: "Application Layer Protocols", description: "HTTP/1.1 vs HTTP/2, DNS resolution flow, SMTP, FTP fundamentals" },
    { level_number: 8, title: "Network Security & TLS/SSL", description: "Symmetric vs asymmetric encryption, TLS handshake, certificates, firewalls" },
    { level_number: 9, title: "Modern Protocols: HTTP/3 & WebSockets", description: "QUIC protocol, UDP multiplexing, bidirectional full-duplex WebSockets" },
    { level_number: 10, title: "Content Delivery Networks & Edge Routing", description: "Anycast routing, CDN caching layers, DDoS mitigation architectures" }
  ],

  // 7: Aptitude & Logical Reasoning
  7: [
    { level_number: 1, title: "Basic Arithmetic & Speed Math", description: "Fractions, decimals, percentages, ratio and proportion shortcuts" },
    { level_number: 2, title: "Number Systems & Divisibility", description: "LCM, HCF, prime factors, divisibility tests, remainder theorems" },
    { level_number: 3, title: "Time, Speed & Distance", description: "Relative speed, trains, boats and streams, circular track problems" },
    { level_number: 4, title: "Time & Work", description: "Pipes and cisterns, efficiency ratios, collaborative task completion" },
    { level_number: 5, title: "Commercial Mathematics", description: "Profit and loss, simple & compound interest, discounts and markups" },
    { level_number: 6, title: "Permutations, Combinations & Probability", description: "Factorials, arrangement vs selection, independent events, conditional prob" },
    { level_number: 7, title: "Blood Relations & Direction Sense", description: "Family tree decoding, complex generational relations, compass bearings" },
    { level_number: 8, title: "Seating Arrangements & Puzzles", description: "Linear and circular seating arrangements, constraint matching grids" },
    { level_number: 9, title: "Syllogisms & Critical Reasoning", description: "Venn diagram proofs, statement-assumption, statement-conclusion evaluation" },
    { level_number: 10, title: "Data Interpretation & Analytical Dashboards", description: "Tables, bar graphs, pie charts, radar plots, multi-variable data synthesis" }
  ],

  // 8: Communication & Behavioral
  8: [
    { level_number: 1, title: "Clear Professional Introduction", description: "Crafting structured elevator pitches, self-introductions, articulate tone" },
    { level_number: 2, title: "Active Listening & Paraphrasing", description: "Engaged note-taking, clarification techniques, demonstrating understanding" },
    { level_number: 3, title: "Written Business Communication", description: "Structured emails, executive summaries, meeting agendas, concise messaging" },
    { level_number: 4, title: "Technical Explanation & Storytelling", description: "Breaking complex algorithms into layman analogies, structured demos" },
    { level_number: 5, title: "STAR Method for Behavioral Interviews", description: "Situation, Task, Action, Result framing for project experiences" },
    { level_number: 6, title: "Conflict Resolution & Team Collaboration", description: "Handling differing technical opinions, constructive code review etiquette" },
    { level_number: 7, title: "Cross-Cultural Communication", description: "Collaborating with global enterprise clients, asynchronous communication norms" },
    { level_number: 8, title: "Handling Ambiguity & Client Discovery", description: "Requirement elicitation, asking probing questions, scope negotiation" },
    { level_number: 9, title: "Leadership & Mentorship Dynamics", description: "Motivating junior peers, delegating tasks, transparent progress reporting" },
    { level_number: 10, title: "Executive Presentations & Pitching", description: "Delivering high-stakes presentations to stakeholders and C-level leaders" }
  ],

  // 9: Web Development Basics
  9: [
    { level_number: 1, title: "HTML5 Semantic Markup", description: "Semantic elements (main, nav, article), document structure, accessibility (a11y)" },
    { level_number: 2, title: "CSS Fundamentals & Box Model", description: "Margin, padding, border, box-sizing, display properties, specificity rules" },
    { level_number: 3, title: "Flexbox & Grid Layouts", description: "1D Flexbox alignment, 2D CSS Grid templates, responsive media queries" },
    { level_number: 4, title: "JavaScript ES6+ Syntax", description: "let/const, arrow functions, destructuring, template literals, modules" },
    { level_number: 5, title: "DOM Manipulation & Event Listeners", description: "Selecting elements, bubbling, capturing, event delegation, forms" },
    { level_number: 6, title: "Asynchronous JS & Fetch API", description: "Promises, async/await, Fetch API, RESTful JSON consumption, error handling" },
    { level_number: 7, title: "Client-Side Storage & Cookies", description: "localStorage, sessionStorage, cookie attributes (HttpOnly, SameSite)" },
    { level_number: 8, title: "Component-Based UI (React Basics)", description: "JSX, props, component composition, useState, useEffect hooks lifecycle" },
    { level_number: 9, title: "Web Performance & Optimization", description: "Lazy loading images, asset minification, critical rendering path, Lighthouse" },
    { level_number: 10, title: "Web Security Fundamentals", description: "Cross-Site Scripting (XSS), CSRF tokens, Content Security Policy (CSP)" }
  ],

  // 10: System Design (Intro)
  10: [
    { level_number: 1, title: "Client-Server Architecture Basics", description: "Request-response flow, HTTP methods, statelessness, DNS lookup steps" },
    { level_number: 2, title: "Horizontal vs Vertical Scaling", description: "Adding CPU/RAM vs distributing load across commodity server instances" },
    { level_number: 3, title: "Load Balancing Strategies", description: "Round robin, least connections, IP hash, Layer 4 vs Layer 7 load balancers" },
    { level_number: 4, title: "Caching Mechanisms & Invalidation", description: "Redis/Memcached, write-through vs write-back vs cache-aside patterns" },
    { level_number: 5, title: "Database Partitioning & Replication", description: "Master-replica topologies, horizontal sharding keys, eventual consistency" },
    { level_number: 6, title: "CAP Theorem & PACELC", description: "Consistency, Availability, Partition tolerance trade-offs in distributed systems" },
    { level_number: 7, title: "Asynchronous Message Queues", description: "Publish-subscribe models, message brokers (Kafka/RabbitMQ), job processing" },
    { level_number: 8, title: "API Design & Rate Limiting", description: "REST vs gRPC, rate limiting algorithms (token bucket, leaky bucket, sliding window)" },
    { level_number: 9, title: "High-Availability System Walkthrough", description: "Designing a URL shortener or pastebin with fault tolerance and failover" },
    { level_number: 10, title: "Microservices vs Monolith Trade-offs", description: "Service boundaries, database per service, distributed tracing and observability" }
  ],

  // 11: Git & Version Control
  11: [
    { level_number: 1, title: "Git Basics & Local Repository", description: "git init, git clone, working directory, staging area, git commit lifecycle" },
    { level_number: 2, title: "Inspecting History & Changes", description: "git status, git log, git diff, commit hashing and commit message conventions" },
    { level_number: 3, title: "Branching Strategies", description: "git branch, git checkout / switch, feature branches, trunk-based development" },
    { level_number: 4, title: "Merging & Conflict Resolution", description: "Fast-forward merges, 3-way merge commits, resolving merge conflicts cleanly" },
    { level_number: 5, title: "Remote Collaboration & Push/Pull", description: "git remote add, git fetch, git pull with rebase, pushing upstream branches" },
    { level_number: 6, title: "Stashing & Temporary Workspaces", description: "git stash, git stash pop, branch stashing, keeping clean working trees" },
    { level_number: 7, title: "Undoing Changes Safely", description: "git reset (--soft, --mixed, --hard), git revert, restoring deleted commits" },
    { level_number: 8, title: "Git Rebase & Interactive Squashing", description: "git rebase -i, squashing commits, amending past commit messages cleanly" },
    { level_number: 9, title: "Pull Requests & Code Review Workflows", description: "Draft PRs, peer review comments, branch protection rules, signing commits" },
    { level_number: 10, title: "Git Hooks & CI/CD Automation", description: "Pre-commit linting hooks, GitHub Actions trigger events, release tagging" }
  ],

  // 12: Generative AI Basics
  12: [
    { level_number: 1, title: "GenAI Foundations & Terminology", description: "Discriminative vs generative AI, tokens, embeddings, hallucination basics" },
    { level_number: 2, title: "Large Language Model Architecture", description: "Transformer self-attention mechanism, decoder-only models, context windows" },
    { level_number: 3, title: "Prompt Engineering Essentials", description: "Zero-shot, few-shot prompting, system instructions, role assignment" },
    { level_number: 4, title: "Structured Output & Function Calling", description: "JSON schema enforcement, tool invocation syntax, deterministic responses" },
    { level_number: 5, title: "Retrieval-Augmented Generation (RAG)", description: "Chunking strategies, vector embeddings, cosine similarity, vector databases" },
    { level_number: 6, title: "Model Temperature & Hyperparameters", description: "Temperature, top-p, top-k sampling, frequency & presence penalties" },
    { level_number: 7, title: "Multimodal Models & Processing", description: "Processing text, images, documents, audio inputs within unified models" },
    { level_number: 8, title: "AI Agents & Autonomous Workflows", description: "ReAct loop (Reason + Act), memory management, task decomposition" },
    { level_number: 9, title: "Evaluation & Benchmarking", description: "RAG triad metrics (faithfulness, answer relevance), ground truth testing" },
    { level_number: 10, title: "Responsible AI & Enterprise Safety", description: "Safety filters, prompt injection defenses, PII redaction, bias mitigation" }
  ]
};

export function getSkillRoadmap(skillSetId: number, skillName: string): SkillTopicLevel[] {
  if (SKILL_TOPICS_ROADMAP[skillSetId]) {
    return SKILL_TOPICS_ROADMAP[skillSetId];
  }
  // Fallback 10-level generator if ever called with another id
  return Array.from({ length: 10 }, (_, i) => ({
    level_number: i + 1,
    title: `Level ${i + 1}: ${skillName} Stage`,
    description: i < 3 
      ? `Foundational principles and key concepts for ${skillName}`
      : i < 7
      ? `Intermediate applications, practical patterns, and project implementation`
      : `Advanced optimization, enterprise architecture, and production readiness`
  }));
}
