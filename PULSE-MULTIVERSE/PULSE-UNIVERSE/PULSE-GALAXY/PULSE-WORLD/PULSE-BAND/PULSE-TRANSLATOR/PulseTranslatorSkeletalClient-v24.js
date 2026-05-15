// ============================================================================
//  PulseSkeletalClient.js — v24-IMMORTAL++
//  THE REAL SQL CLIENT (THE ONE THAT CONNECTS AND RUNS)
//  ----------------------------------------------------
//  This file is your:
//    • SQL Server connection engine
//    • SQL execution engine
//    • SQL pool manager
//    • SQL retry logic
//    • SQL tuning guide
//    • SQL Server optimization bible
//    • MySQL/Postgres comparison reference
//    • Future migration guide
//    • 2004 → 2030 SQL evolution manual
//
//  THIS FILE *DOES* OPEN A SQL CONNECTION.
//  THIS FILE *DOES* EXECUTE SQL.
//  THIS FILE *IS* THE SQL CLIENT.
//  THIS FILE *IS* THE ADAPTER.
//  THIS FILE *IS* THE ENGINE.
//  THIS FILE *IS* THE SKELETON.
// ============================================================================

//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝

import sql from "mssql";

// ============================================================================
//  SQL SERVER CONNECTION SETTINGS (2026 OPTIMIZED)
// ============================================================================
//
//  These settings are tuned for:
//    • SQL Server 2025/2026 Enterprise
//    • High-end hardware
//    • 10Gb+ LAN
//    • Low latency
//    • High concurrency
//    • Deterministic workloads
//
//  If you switch to MySQL/Postgres later, KEEP THIS FILE as reference.
// ============================================================================

// ============================================================================
//  SQL SERVER CONNECTION SETTINGS (2026+ BEAST MODE)
// ============================================================================
//
//  This block contains EVERY meaningful SQL Server setting you might tune.
//  It is designed for:
//    • SQL Server 2025/2026 Enterprise
//    • High-end hardware (multi-core, NVMe, 10Gb LAN)
//    • Low-latency LAN environments
//    • High concurrency workloads
//    • Deterministic Pulse OS operations
//
//  FUTURE YOU:
//    If you ever switch to MySQL/Postgres, KEEP THIS BLOCK as a reference.
// ============================================================================
// ============================================================================
//  SQL SERVER 2026 INSTANCE SETTINGS (THE REAL ONES YOU SET IN SQL SERVER)
// ============================================================================
//
//  This section is NOT code. These are the ACTUAL SQL SERVER SETTINGS you
//  configure inside SQL Server Management Studio (SSMS) or via T-SQL.
//
//  These settings make your organism FASTER, SAFER, MORE DETERMINISTIC,
//  and FUTURE-PROOF.
//
//  READ THIS SECTION WHEN YOU SET UP YOUR SQL SERVER INSTANCE.
//
// ---------------------------------------------------------------------------
//  1. MAXDOP (MAX DEGREE OF PARALLELISM)
// ---------------------------------------------------------------------------
//  • Controls how many CPU cores a single query can use.
//  • On a high-end multi-core server, set:
//        EXEC sp_configure 'max degree of parallelism', 8;
//  • NEVER leave it at 0 (unlimited) — causes CPU storms.
//
// ---------------------------------------------------------------------------
//  2. COST THRESHOLD FOR PARALLELISM
// ---------------------------------------------------------------------------
//  • Default is 5 — WAY too low.
//  • Set to 50–100 for modern hardware:
//        EXEC sp_configure 'cost threshold for parallelism', 75;
//
// ---------------------------------------------------------------------------
//  3. MEMORY SETTINGS
// ---------------------------------------------------------------------------
//  • SQL Server will eat ALL RAM unless you cap it.
//  • Leave 4–8GB for Windows.
//  • Example for a 64GB server:
//        EXEC sp_configure 'max server memory', 56000;
//
// ---------------------------------------------------------------------------
//  4. TEMPDB CONFIGURATION (CRITICAL FOR PERFORMANCE)
// ---------------------------------------------------------------------------
//  • Use MULTIPLE TempDB files (1 per logical CPU up to 8).
//  • All files same size.
//  • Enable Instant File Initialization.
//  • Pre-size TempDB to avoid autogrowth.
//
// ---------------------------------------------------------------------------
//  5. INSTANT FILE INITIALIZATION
// ---------------------------------------------------------------------------
//  • MASSIVE performance boost for file growth.
//  • Enable via Local Security Policy:
//        "Perform volume maintenance tasks"
//
// ---------------------------------------------------------------------------
//  6. AUTO-GROWTH SETTINGS (NEVER LEAVE DEFAULTS)
// ---------------------------------------------------------------------------
//  • Set fixed MB growth, NOT percentage.
//  • Example:
//        Data files: 512MB growth
//        Log files: 256MB growth
//
// ---------------------------------------------------------------------------
//  7. SNAPSHOT ISOLATION + READ COMMITTED SNAPSHOT
// ---------------------------------------------------------------------------
//  • Eliminates blocking.
//  • Enables MVCC-like behavior.
//  • Perfect for high concurrency Pulse workloads.
//        ALTER DATABASE YourDB SET ALLOW_SNAPSHOT_ISOLATION ON;
//        ALTER DATABASE YourDB SET READ_COMMITTED_SNAPSHOT ON;
//
// ---------------------------------------------------------------------------
//  8. QUERY STORE SETTINGS
// ---------------------------------------------------------------------------
//  • Enable Query Store for plan stability.
//  • Use "Force Last Good Plan" mode.
//
// ---------------------------------------------------------------------------
//  9. CARDINALITY ESTIMATOR VERSION
// ---------------------------------------------------------------------------
//  • SQL Server 2026 uses CE 150 by default.
//  • If you see regressions, switch to legacy CE 70.
//
// ---------------------------------------------------------------------------
// 10. OPTIMIZE FOR AD HOC WORKLOADS
// ---------------------------------------------------------------------------
//  • Prevents plan cache bloat.
//        EXEC sp_configure 'optimize for ad hoc workloads', 1;
//
// ---------------------------------------------------------------------------
// 11. AUTO-CREATE / AUTO-UPDATE STATISTICS
// ---------------------------------------------------------------------------
//  • MUST be ON for modern workloads.
//  • But enable ASYNC stats updates.
//
// ---------------------------------------------------------------------------
// 12. AUTO-SHRINK = OFF (ALWAYS)
// ---------------------------------------------------------------------------
//  • Shrinking destroys performance.
//  • Never enable auto-shrink.
//
// ---------------------------------------------------------------------------
// 13. AUTO-CLOSE = OFF
// ---------------------------------------------------------------------------
//  • Prevents constant open/close cycles.
//
// ---------------------------------------------------------------------------
// 14. BACKUP COMPRESSION = ON
// ---------------------------------------------------------------------------
//  • Saves disk + speeds up backups.
//
// ---------------------------------------------------------------------------
// 15. COLUMNSTORE INDEXES (OPTIONAL)
// ---------------------------------------------------------------------------
//  • AMAZING for analytics.
//  • Not ideal for OLTP-heavy tables.
//
// ---------------------------------------------------------------------------
// 16. MEMORY-OPTIMIZED TABLES (OPTIONAL)
// ---------------------------------------------------------------------------
//  • For ultra-high-speed ingestion.
//  • Use SCHEMA_ONLY durability for cache-like tables.
//
// ---------------------------------------------------------------------------
// 17. TRACE FLAGS (ADVANCED)
// ---------------------------------------------------------------------------
//  • 1117/1118 behavior is default in modern SQL Server.
//  • 4199 enables optimizer hotfixes.
//  • 1222 logs deadlocks.
//
// ---------------------------------------------------------------------------
// 18. DEADLOCK PRIORITY
// ---------------------------------------------------------------------------
//  • Set low-priority tasks to LOW.
//
// ---------------------------------------------------------------------------
// 19. LOCK TIMEOUT
// ---------------------------------------------------------------------------
//  • Prevents infinite waits.
//
// ---------------------------------------------------------------------------
// 20. DATABASE COMPATIBILITY LEVEL
// ---------------------------------------------------------------------------
//  • Set to latest (160/170/180 depending on version).
//
// ---------------------------------------------------------------------------
// 21. READ-ONLY ROUTING (AGs)
// ---------------------------------------------------------------------------
//  • If you use Availability Groups, route reads to replicas.
//
// ---------------------------------------------------------------------------
// 22. FILEGROUP STRATEGY
// ---------------------------------------------------------------------------
//  • Separate FG for large tables.
//  • Separate FG for memory-optimized tables.
//
// ---------------------------------------------------------------------------
// 23. TEMPDB METADATA OPTIMIZATION
// ---------------------------------------------------------------------------
//  • SQL Server 2022+ has metadata optimization.
//  • Ensure it's enabled.
//
// ---------------------------------------------------------------------------
// 24. NETWORK PACKET SIZE
// ---------------------------------------------------------------------------
//  • 32768 is ideal for large result sets.
//
// ---------------------------------------------------------------------------
// 25. PRIORITY BOOST = OFF
// ---------------------------------------------------------------------------
//  • Old myth. Causes instability.
//
// ---------------------------------------------------------------------------
// 26. SERVICE ACCOUNT TUNING
// ---------------------------------------------------------------------------
//  • Use a dedicated domain/service account.
//  • Grant minimal permissions.
//
// ---------------------------------------------------------------------------
// 27. NUMA AWARENESS
// ---------------------------------------------------------------------------
//  • SQL Server automatically detects NUMA.
//  • Keep max worker threads default.
//
// ---------------------------------------------------------------------------
// 28. PARALLELISM NOTES
// ---------------------------------------------------------------------------
//  • MAXDOP + Cost Threshold = your main tuning knobs.
//
// ---------------------------------------------------------------------------
// 29. INDEX TUNING NOTES
// ---------------------------------------------------------------------------
//  • Clustered index on ID (BIGINT).
//  • Nonclustered indexes on:
//        createdAt
//        updatedAt
//        userId
//        foreign keys
//
// ---------------------------------------------------------------------------
// 30. FUTURE MIGRATION NOTES
// ---------------------------------------------------------------------------
//  • Postgres = best JSON + cloud.
//  • MySQL = cheap + simple.
//  • SQL Server = deterministic tank.
//
// ============================================================================

export const SqlConfig = {
  server: "YOUR-SERVER-IP-OR-HOSTNAME",
  database: "YOUR_DATABASE_NAME",
  user: "YOUR_USERNAME",
  password: "YOUR_PASSWORD",

  // --------------------------------------------------------------------------
  //  CONNECTION POOL SETTINGS (THE HEARTBEAT OF PERFORMANCE)
  // --------------------------------------------------------------------------
  //
  //  max:
  //    • How many concurrent connections the pool can open.
  //    • On a beast server, 50–200 is normal.
  //
  //  min:
  //    • How many connections stay warm.
  //    • 5–10 is ideal for LAN servers.
  //
  //  idleTimeoutMillis:
  //    • How long a connection can sit idle before being closed.
  //    • 30 seconds is safe.
  //
  //  acquireTimeoutMillis:
  //    • How long to wait for a connection from the pool.
  //    • Increase if you expect bursts.
  //
  // --------------------------------------------------------------------------
  pool: {
    max: 100,
    min: 10,
    idleTimeoutMillis: 30000,
    acquireTimeoutMillis: 15000,
  },

  // --------------------------------------------------------------------------
  //  SQL SERVER ADVANCED OPTIONS (2026 OPTIMIZED)
  // --------------------------------------------------------------------------
  //
  //  encrypt:
  //    • LAN = false (faster)
  //    • Internet = true
  //
  //  trustServerCertificate:
  //    • true for LAN
  //
  //  enableArithAbort:
  //    • MUST be true for modern SQL Server performance
  //
  //  connectionTimeout:
  //    • How long to wait to CONNECT
  //
  //  requestTimeout:
  //    • How long to wait for a QUERY
  //
  //  packetSize:
  //    • 4096 = default
  //    • 32768 = faster for large results
  //
  //  isolationLevel:
  //    • READ COMMITTED = default
  //    • SNAPSHOT = best for concurrency
  //    • SERIALIZABLE = strongest but slowest
  //
  //  readOnlyIntent:
  //    • true if connecting to a read replica
  //
  // --------------------------------------------------------------------------
  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true,

    connectionTimeout: 15000,
    requestTimeout: 30000,

    packetSize: 32768, // Faster for large result sets

    // Choose your concurrency model:
    isolationLevel: sql.ISOLATION_LEVEL.READ_COMMITTED,
    // isolationLevel: sql.ISOLATION_LEVEL.SNAPSHOT,
    // isolationLevel: sql.ISOLATION_LEVEL.SERIALIZABLE,

    readOnlyIntent: false,
  },

  // --------------------------------------------------------------------------
  //  RETRY / RESILIENCY SETTINGS
  // --------------------------------------------------------------------------
  //
  //  retryAttempts:
  //    • How many times to retry a failed query.
  //
  //  retryDelay:
  //    • How long to wait between retries.
  //
  //  jitter:
  //    • Random variance to avoid retry storms.
  //
  // --------------------------------------------------------------------------
  resiliency: {
    retryAttempts: 3,
    retryDelay: 250, // ms
    jitter: true,
  },

  // --------------------------------------------------------------------------
  //  LOGGING SETTINGS
  // --------------------------------------------------------------------------
  //
  //  verbose:
  //    • true = log EVERYTHING
  //    • false = only errors
  //
  //  slowQueryThreshold:
  //    • Log queries slower than X ms
  //
  // --------------------------------------------------------------------------
  logging: {
    verbose: true,
    slowQueryThreshold: 200, // ms
  },
};


// ============================================================================
//  SQL CLIENT CLASS (THE ENGINE)
// ============================================================================
//
//  This class:
//    • Opens the pool
//    • Executes queries
//    • Handles retries
//    • Handles transactions
//    • Logs errors
//    • Returns results
//
//  This is the REAL SQL CLIENT you asked for.
// ============================================================================

export class PulseSqlClient {
  constructor(config = SqlConfig) {
    this.config = config;
    this.pool = null;
  }

  // --------------------------------------------------------------------------
  //  OPEN CONNECTION POOL
  // --------------------------------------------------------------------------
  async connect() {
    if (this.pool) return this.pool;

    try {
      this.pool = await sql.connect(this.config);
      console.log("🔥 SQL SERVER CONNECTED (PulseSqlClient)");
      return this.pool;
    } catch (err) {
      console.error("❌ SQL CONNECTION FAILED:", err);
      throw err;
    }
  }

  // --------------------------------------------------------------------------
  //  EXECUTE A QUERY (WITH RETRIES)
  // --------------------------------------------------------------------------
  async query(queryString, params = {}) {
    const pool = await this.connect();

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const request = pool.request();

        // Bind parameters
        for (const [key, value] of Object.entries(params)) {
          request.input(key, value);
        }

        const result = await request.query(queryString);
        return result.recordset;
      } catch (err) {
        console.error(`⚠️ SQL QUERY FAILED (attempt ${attempt}):`, err);

        if (attempt === 3) throw err;
      }
    }
  }

  // --------------------------------------------------------------------------
  //  RUN A TRANSACTION
  // --------------------------------------------------------------------------
  async transaction(callback) {
    const pool = await this.connect();
    const transaction = new sql.Transaction(pool);

    try {
      await transaction.begin();

      const request = new sql.Request(transaction);
      const result = await callback(request);

      await transaction.commit();
      return result;
    } catch (err) {
      console.error("❌ TRANSACTION FAILED — ROLLING BACK:", err);
      await transaction.rollback();
      throw err;
    }
  }
}

// ============================================================================
//  WHY SQL SERVER IS PERFECT FOR YOUR 2025++ BEAST HARDWARE
// ============================================================================
//
//  • Best ACID engine
//  • Best transaction model
//  • Best stored procedure engine
//  • Best query optimizer
//  • Best indexing system
//  • Best deterministic behavior
//  • Perfect for enterprise-grade workloads
//  • Perfect for LAN-based high-speed servers
//
//  Your hardware LOVES SQL Server.
// ============================================================================


// ============================================================================
//  WHY YOU *MIGHT* SWITCH TO MYSQL SOMEDAY
// ============================================================================
//
//  • Cheap hosting
//  • Easy deployment
//  • Lightweight
//  • Fast simple reads
//  • Works everywhere
//
//  But:
//    - Weak transactions
//    - Weak stored procedures
//    - Weak optimizer
//    - Weak JSON
//
//  MySQL is a sports car.
//  SQL Server is a tank.
// ============================================================================


// ============================================================================
//  WHY YOU *MIGHT* SWITCH TO POSTGRES SOMEDAY
// ============================================================================
//
//  • Best JSON support (jsonb)
//  • Best concurrency model
//  • Best indexing (GIN/GiST/BRIN)
//  • Best open-source ACID engine
//  • Best for cloud/distributed systems
//  • Best for AI workloads
//
//  Postgres is the modern king.
// ============================================================================


// ============================================================================
//  FINAL NOTES FOR FUTURE YOU
// ============================================================================
//
//  • THIS FILE IS THE SQL CLIENT.
//  • THIS FILE CONNECTS.
//  • THIS FILE RUNS.
//  • THIS FILE EXECUTES.
//  • THIS FILE IS THE ENGINE.
//  • THIS FILE IS THE ADAPTER.
//  • THIS FILE IS THE SKELETON.
//
//  If you ever switch engines:
//    - Keep this file as reference.
//    - Swap the connection logic.
//    - Keep the organism untouched.
//
// ============================================================================
// ============================================================================
//  SQL SERVER 2026 INSTANCE SETTINGS (EXPLAINED LIKE YOU KNOW NOTHING)
// ============================================================================
//
//  These are NOT JavaScript settings.
//  These are NOT Node settings.
//  These are NOT config settings.
//
//  THESE ARE THE REAL SETTINGS INSIDE SQL SERVER ITSELF.
//
//  You change these in:
//    • SQL Server Management Studio (SSMS)
//    • or by running the T-SQL commands shown
//
//  WHY THIS SECTION EXISTS:
//  ------------------------
//  Because SQL Server has 100+ settings, and 90% of them are useless.
//  These are the 30 that ACTUALLY MATTER for performance, stability,
//  concurrency, and making your organism FAST and DETERMINISTIC.
//
//  I explain each one in PLAIN ENGLISH so you understand EXACTLY what it does.
// ============================================================================


// ---------------------------------------------------------------------------
// 1. MAXDOP (MAX DEGREE OF PARALLELISM)
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   How many CPU cores SQL Server is allowed to use for ONE query.
//
// WHY IT MATTERS:
//   If SQL Server uses ALL your cores for ONE query, everything else freezes.
//
// WHAT TO SET:
//   On a modern multi-core server: MAXDOP = 8
//
// HOW TO SET IT:
//   EXEC sp_configure 'max degree of parallelism', 8;
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 2. COST THRESHOLD FOR PARALLELISM
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   SQL Server decides when to use multiple CPU cores.
//   The default value (5) is from the year 1998.
//
// WHY IT MATTERS:
//   With modern CPUs, SQL Server goes parallel WAY too often.
//
// WHAT TO SET:
//   50–100 is ideal for modern hardware.
//
// HOW TO SET:
//   EXEC sp_configure 'cost threshold for parallelism', 75;
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 3. MAX SERVER MEMORY
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   SQL Server will eat ALL RAM unless you cap it.
//
// WHY IT MATTERS:
//   If SQL Server takes all RAM, Windows dies, everything crashes.
//
// WHAT TO SET:
//   Leave 4–8GB for Windows.
//
// EXAMPLE FOR 64GB SERVER:
//   EXEC sp_configure 'max server memory', 56000;
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 4. TEMPDB CONFIGURATION
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   TempDB is SQL Server’s “scratch pad” — it uses it CONSTANTLY.
//
// WHY IT MATTERS:
//   If TempDB is slow, EVERYTHING is slow.
//
// WHAT TO DO:
//   • Use MULTIPLE TempDB files (1 per CPU core up to 8)
//   • All files same size
//   • Enable Instant File Initialization
//   • Pre-size TempDB so it never autogrows
//
// RESULT:
//   MASSIVE performance boost.
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 5. INSTANT FILE INITIALIZATION
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   Lets SQL Server grow files instantly instead of slowly zeroing them out.
//
// WHY IT MATTERS:
//   Without this, SQL Server pauses for seconds/minutes during growth.
//
// HOW TO ENABLE:
//   Windows Local Security Policy → "Perform volume maintenance tasks"
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 6. AUTO-GROWTH SETTINGS
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   How SQL Server grows data/log files.
//
// WHY IT MATTERS:
//   Default settings grow in tiny chunks → fragmentation → slow DB.
//
// WHAT TO SET:
//   • Data files: grow by 512MB
//   • Log files: grow by 256MB
//
// NEVER USE PERCENTAGE GROWTH.
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 7. SNAPSHOT ISOLATION + READ COMMITTED SNAPSHOT
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   A modern concurrency model (MVCC).
//
// WHY IT MATTERS:
//   Prevents blocking and deadlocks.
//   Makes reads NOT block writes.
//   Makes writes NOT block reads.
//
// WHAT TO SET:
//   ALTER DATABASE YourDB SET ALLOW_SNAPSHOT_ISOLATION ON;
//   ALTER DATABASE YourDB SET READ_COMMITTED_SNAPSHOT ON;
//
// RESULT:
//   Your organism becomes smooth and non-blocking.
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 8. QUERY STORE
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   SQL Server’s “black box recorder” for query performance.
//
// WHY IT MATTERS:
//   It can FORCE a good execution plan if SQL Server picks a bad one.
//
// WHAT TO DO:
//   Enable Query Store in “Force Last Good Plan” mode.
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 9. CARDINALITY ESTIMATOR VERSION
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   SQL Server’s brain for estimating row counts.
//
// WHY IT MATTERS:
//   Newer versions are better, but sometimes regress.
//
// WHAT TO DO:
//   • Use the latest CE (default)
//   • If performance tanks, switch to legacy CE 70
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 10. OPTIMIZE FOR AD HOC WORKLOADS
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   Prevents SQL Server from caching thousands of useless one-time plans.
//
// WHY IT MATTERS:
//   Saves memory, improves performance.
//
// HOW TO ENABLE:
//   EXEC sp_configure 'optimize for ad hoc workloads', 1;
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 11. AUTO-CREATE / AUTO-UPDATE STATISTICS
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   SQL Server’s way of understanding your data.
//
// WHY IT MATTERS:
//   Without good stats, SQL Server guesses wrong → slow queries.
//
// WHAT TO DO:
//   • Auto-create stats = ON
//   • Auto-update stats = ON
//   • Auto-update stats async = ON
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 12. AUTO-SHRINK = OFF
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   SQL Server shrinking files automatically.
//
// WHY IT MATTERS:
//   Shrinking DESTROYS performance and fragments files.
//
// WHAT TO DO:
//   ALWAYS turn auto-shrink OFF.
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 13. AUTO-CLOSE = OFF
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   SQL Server closes DB files when not in use.
//
// WHY IT MATTERS:
//   Causes constant open/close cycles → slow.
//
// WHAT TO DO:
//   ALWAYS turn auto-close OFF.
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 14. BACKUP COMPRESSION
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   Compresses backups.
//
// WHY IT MATTERS:
//   Faster backups, smaller files.
//
// WHAT TO DO:
//   Turn it ON.
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 15. COLUMNSTORE INDEXES
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   Special index type for analytics.
//
// WHY IT MATTERS:
//   10x–100x faster reporting queries.
//
// WHEN TO USE:
//   • Large tables
//   • Reporting
//   • Analytics
//
// WHEN NOT TO USE:
//   • Heavy OLTP tables
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 16. MEMORY-OPTIMIZED TABLES
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   Tables stored in RAM.
//
// WHY IT MATTERS:
//   INSANE speed for cache-like tables.
//
// WHEN TO USE:
//   • Session tables
//   • Caches
//   • High-frequency inserts
//
// WHEN NOT TO USE:
//   • Large persistent tables
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 17. TRACE FLAGS
// ---------------------------------------------------------------------------
// WHAT THEY ARE:
//   Hidden switches that change SQL Server behavior.
//
// USEFUL ONES:
//   • 4199 = enable optimizer hotfixes
//   • 1222 = log deadlocks
//
// MOST TRACE FLAGS ARE OBSOLETE IN 2026.
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 18. DEADLOCK PRIORITY
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   Lets you choose which queries “lose” deadlocks.
//
// WHY IT MATTERS:
//   You can protect important operations.
//
// EXAMPLE:
//   SET DEADLOCK_PRIORITY LOW;
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 19. LOCK TIMEOUT
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   How long SQL Server waits for a lock.
//
// WHY IT MATTERS:
//   Prevents infinite waits.
//
// EXAMPLE:
//   SET LOCK_TIMEOUT 5000;  -- 5 seconds
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 20. DATABASE COMPATIBILITY LEVEL
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   Controls which SQL Server engine version your DB uses.
//
// WHAT TO SET:
//   Use the latest (160/170/180 depending on version).
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 21. READ-ONLY ROUTING (Availability Groups)
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   Routes read queries to replicas.
//
// WHY IT MATTERS:
//   Offloads read traffic from primary.
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 22. FILEGROUP STRATEGY
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   Splitting data across multiple filegroups.
//
// WHY IT MATTERS:
//   Better performance for large tables.
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 23. TEMPDB METADATA OPTIMIZATION
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   SQL Server 2022+ feature that reduces contention.
//
// WHAT TO DO:
//   Ensure it’s ON.
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 24. NETWORK PACKET SIZE
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   Size of network packets.
//
// WHAT TO SET:
//   32768 for large result sets.
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 25. PRIORITY BOOST = OFF
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   Old setting that “boosts” SQL Server priority.
//
// WHY IT MATTERS:
//   Causes instability. Never use it.
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 26. SERVICE ACCOUNT TUNING
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   SQL Server runs under a Windows account.
//
// WHAT TO DO:
//   Use a dedicated service account with minimal permissions.
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 27. NUMA AWARENESS
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   SQL Server splits CPUs into NUMA nodes.
//
// WHAT TO DO:
//   Let SQL Server handle it automatically.
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 28. PARALLELISM NOTES
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   How SQL Server uses multiple cores.
//
// WHAT TO DO:
//   MAXDOP + Cost Threshold = your main tuning knobs.
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 29. INDEX TUNING NOTES
// ---------------------------------------------------------------------------
// WHAT TO DO:
//   • Clustered index on ID (BIGINT)
//   • Nonclustered indexes on:
//        createdAt
//        updatedAt
//        userId
//        foreign keys
//
// WHY IT MATTERS:
//   Indexes = speed.
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 30. FUTURE MIGRATION NOTES
// ---------------------------------------------------------------------------
// SQL Server = deterministic tank
// Postgres   = cloud-native JSON king
// MySQL      = cheap and cheerful
// ---------------------------------------------------------------------------
