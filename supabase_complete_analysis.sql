-- ============================================================================
-- SUPABASE KOMPLETTE KONFIGURATIONS-ANALYSE
-- ============================================================================
-- Dieses Script analysiert alle Supabase-Einstellungen und gibt sie
-- im JSON-Format aus, damit ChatGPT sie lesen und verstehen kann.
--
-- Ausführung: Kopiere jeden Abschnitt in den Supabase SQL-Editor
-- oder führe das komplette Script aus.
-- ============================================================================

-- ============================================================================
-- SEKTION 1: ALLE TABELLEN MIT VOLLSTÄNDIGER STRUKTUR
-- ============================================================================

SELECT jsonb_pretty(
  jsonb_build_object(
    'section', 'database_tables',
    'timestamp', now(),
    'tables', (
      SELECT jsonb_agg(
        jsonb_build_object(
          'schema', schemaname,
          'table_name', tablename,
          'owner', tableowner,
          'row_security_enabled',
            (SELECT relrowsecurity FROM pg_class
             WHERE relname = tablename AND relnamespace::regnamespace::text = schemaname),
          'columns', (
            SELECT jsonb_agg(
              jsonb_build_object(
                'column_name', column_name,
                'data_type', data_type,
                'is_nullable', is_nullable,
                'column_default', column_default,
                'character_maximum_length', character_maximum_length,
                'numeric_precision', numeric_precision,
                'numeric_scale', numeric_scale
              ) ORDER BY ordinal_position
            )
            FROM information_schema.columns c
            WHERE c.table_schema = t.schemaname
              AND c.table_name = t.tablename
          )
        )
      )
      FROM pg_tables t
      WHERE schemaname = 'public'
      ORDER BY tablename
    )
  )
) AS database_tables_analysis;

-- ============================================================================
-- SEKTION 2: ALLE CONSTRAINTS (PRIMARY KEYS, FOREIGN KEYS, UNIQUE, CHECK)
-- ============================================================================

SELECT jsonb_pretty(
  jsonb_build_object(
    'section', 'database_constraints',
    'timestamp', now(),
    'constraints', (
      SELECT jsonb_agg(
        jsonb_build_object(
          'constraint_name', conname,
          'constraint_type',
            CASE contype
              WHEN 'p' THEN 'PRIMARY KEY'
              WHEN 'f' THEN 'FOREIGN KEY'
              WHEN 'u' THEN 'UNIQUE'
              WHEN 'c' THEN 'CHECK'
              WHEN 'x' THEN 'EXCLUSION'
              ELSE 'OTHER'
            END,
          'table_schema', n.nspname,
          'table_name', c.relname,
          'definition', pg_get_constraintdef(con.oid),
          'columns', (
            SELECT array_agg(a.attname ORDER BY u.pos)
            FROM unnest(con.conkey) WITH ORDINALITY AS u(attnum, pos)
            JOIN pg_attribute a ON a.attnum = u.attnum AND a.attrelid = con.conrelid
          ),
          'is_deferrable', con.condeferrable,
          'is_deferred', con.condeferred
        )
      )
      FROM pg_constraint con
      JOIN pg_class c ON con.conrelid = c.oid
      JOIN pg_namespace n ON c.relnamespace = n.oid
      WHERE n.nspname = 'public'
      ORDER BY c.relname, conname
    )
  )
) AS database_constraints_analysis;

-- ============================================================================
-- SEKTION 3: ALLE INDIZES
-- ============================================================================

SELECT jsonb_pretty(
  jsonb_build_object(
    'section', 'database_indexes',
    'timestamp', now(),
    'indexes', (
      SELECT jsonb_agg(
        jsonb_build_object(
          'schema', schemaname,
          'table_name', tablename,
          'index_name', indexname,
          'index_definition', indexdef,
          'is_unique', (indexdef LIKE '%UNIQUE%'),
          'is_primary', (indexname LIKE '%_pkey')
        )
      )
      FROM pg_indexes
      WHERE schemaname = 'public'
      ORDER BY tablename, indexname
    )
  )
) AS database_indexes_analysis;

-- ============================================================================
-- SEKTION 4: ALLE RLS POLICIES MIT VOLLSTÄNDIGER DEFINITION
-- ============================================================================

SELECT jsonb_pretty(
  jsonb_build_object(
    'section', 'row_level_security_policies',
    'timestamp', now(),
    'tables_with_rls', (
      SELECT jsonb_agg(
        jsonb_build_object(
          'schema', schemaname,
          'table_name', tablename,
          'rls_enabled',
            (SELECT relrowsecurity FROM pg_class
             WHERE relname = tablename AND relnamespace::regnamespace::text = schemaname),
          'rls_forced',
            (SELECT relforcerowsecurity FROM pg_class
             WHERE relname = tablename AND relnamespace::regnamespace::text = schemaname),
          'policies', (
            SELECT jsonb_agg(
              jsonb_build_object(
                'policy_name', policyname,
                'command', cmd,
                'roles', roles,
                'permissive', permissive,
                'qual', qual,
                'with_check', with_check
              )
            )
            FROM pg_policies p
            WHERE p.schemaname = t.schemaname
              AND p.tablename = t.tablename
          )
        )
      )
      FROM pg_tables t
      WHERE schemaname = 'public'
      ORDER BY tablename
    )
  )
) AS rls_policies_analysis;

-- ============================================================================
-- SEKTION 5: ALLE CUSTOM FUNCTIONS MIT VOLLSTÄNDIGEM CODE
-- ============================================================================

SELECT jsonb_pretty(
  jsonb_build_object(
    'section', 'database_functions',
    'timestamp', now(),
    'functions', (
      SELECT jsonb_agg(
        jsonb_build_object(
          'schema', n.nspname,
          'function_name', p.proname,
          'function_signature', pg_get_function_identity_arguments(p.oid),
          'return_type', pg_get_function_result(p.oid),
          'language', l.lanname,
          'security_type',
            CASE
              WHEN p.prosecdef THEN 'SECURITY DEFINER'
              ELSE 'SECURITY INVOKER'
            END,
          'volatility',
            CASE p.provolatile
              WHEN 'i' THEN 'IMMUTABLE'
              WHEN 's' THEN 'STABLE'
              WHEN 'v' THEN 'VOLATILE'
            END,
          'parallel_safety',
            CASE p.proparallel
              WHEN 's' THEN 'SAFE'
              WHEN 'r' THEN 'RESTRICTED'
              WHEN 'u' THEN 'UNSAFE'
            END,
          'is_strict', p.proisstrict,
          'function_definition', pg_get_functiondef(p.oid),
          'owner', pg_get_userbyid(p.proowner),
          'description', obj_description(p.oid, 'pg_proc'),
          'acl', p.proacl::text
        )
      )
      FROM pg_proc p
      JOIN pg_namespace n ON p.pronamespace = n.oid
      JOIN pg_language l ON p.prolang = l.oid
      WHERE n.nspname = 'public'
      ORDER BY p.proname
    )
  )
) AS database_functions_analysis;

-- ============================================================================
-- SEKTION 6: ALLE TRIGGER MIT FUNKTIONSCODE
-- ============================================================================

SELECT jsonb_pretty(
  jsonb_build_object(
    'section', 'database_triggers',
    'timestamp', now(),
    'triggers', (
      SELECT jsonb_agg(
        jsonb_build_object(
          'trigger_schema', n.nspname,
          'table_name', c.relname,
          'trigger_name', t.tgname,
          'trigger_enabled', t.tgenabled = 'O',
          'trigger_timing',
            CASE
              WHEN t.tgtype & 2 = 2 THEN 'BEFORE'
              WHEN t.tgtype & 64 = 64 THEN 'INSTEAD OF'
              ELSE 'AFTER'
            END,
          'trigger_events',
            array_remove(ARRAY[
              CASE WHEN t.tgtype & 4 = 4 THEN 'INSERT' END,
              CASE WHEN t.tgtype & 8 = 8 THEN 'DELETE' END,
              CASE WHEN t.tgtype & 16 = 16 THEN 'UPDATE' END,
              CASE WHEN t.tgtype & 32 = 32 THEN 'TRUNCATE' END
            ], NULL),
          'trigger_level',
            CASE WHEN t.tgtype & 1 = 1 THEN 'ROW' ELSE 'STATEMENT' END,
          'trigger_function_schema', fn.nspname,
          'trigger_function_name', p.proname,
          'trigger_function_definition', pg_get_functiondef(p.oid),
          'trigger_definition', pg_get_triggerdef(t.oid)
        )
      )
      FROM pg_trigger t
      JOIN pg_class c ON t.tgrelid = c.oid
      JOIN pg_namespace n ON c.relnamespace = n.oid
      JOIN pg_proc p ON t.tgfoid = p.oid
      JOIN pg_namespace fn ON p.pronamespace = fn.oid
      WHERE n.nspname = 'public'
        AND NOT t.tgisinternal
      ORDER BY c.relname, t.tgname
    )
  )
) AS database_triggers_analysis;

-- ============================================================================
-- SEKTION 7: ALLE TABLE GRANTS UND BERECHTIGUNGEN
-- ============================================================================

SELECT jsonb_pretty(
  jsonb_build_object(
    'section', 'table_privileges',
    'timestamp', now(),
    'privileges', (
      SELECT jsonb_agg(
        jsonb_build_object(
          'table_schema', table_schema,
          'table_name', table_name,
          'grantee', grantee,
          'privilege_type', privilege_type,
          'is_grantable', is_grantable
        )
      )
      FROM information_schema.table_privileges
      WHERE table_schema = 'public'
      ORDER BY table_name, grantee, privilege_type
    )
  )
) AS table_privileges_analysis;

-- ============================================================================
-- SEKTION 8: ALLE FUNCTION GRANTS
-- ============================================================================

SELECT jsonb_pretty(
  jsonb_build_object(
    'section', 'function_privileges',
    'timestamp', now(),
    'function_grants', (
      SELECT jsonb_agg(
        jsonb_build_object(
          'schema', n.nspname,
          'function_name', p.proname,
          'function_signature', pg_get_function_identity_arguments(p.oid),
          'acl', p.proacl::text,
          'grants_parsed', (
            SELECT array_agg(
              regexp_replace(
                unnest(aclexplode(p.proacl))::text,
                '[()]',
                '',
                'g'
              )
            )
          )
        )
      )
      FROM pg_proc p
      JOIN pg_namespace n ON p.pronamespace = n.oid
      WHERE n.nspname = 'public'
        AND p.proacl IS NOT NULL
      ORDER BY p.proname
    )
  )
) AS function_privileges_analysis;

-- ============================================================================
-- SEKTION 9: REALTIME PUBLIKATIONEN UND KONFIGURATION
-- ============================================================================

SELECT jsonb_pretty(
  jsonb_build_object(
    'section', 'realtime_configuration',
    'timestamp', now(),
    'publications', (
      SELECT jsonb_agg(
        jsonb_build_object(
          'publication_name', pubname,
          'owner', pg_get_userbyid(pubowner),
          'all_tables', puballtables,
          'insert_enabled', pubinsert,
          'update_enabled', pubupdate,
          'delete_enabled', pubdelete,
          'truncate_enabled', pubtruncate,
          'tables', (
            SELECT array_agg(schemaname || '.' || tablename)
            FROM pg_publication_tables
            WHERE pubname = p.pubname
          )
        )
      )
      FROM pg_publication p
    ),
    'table_replica_identity', (
      SELECT jsonb_agg(
        jsonb_build_object(
          'schema', n.nspname,
          'table_name', c.relname,
          'replica_identity',
            CASE c.relreplident
              WHEN 'd' THEN 'DEFAULT'
              WHEN 'n' THEN 'NOTHING'
              WHEN 'f' THEN 'FULL'
              WHEN 'i' THEN 'INDEX'
            END
        )
      )
      FROM pg_class c
      JOIN pg_namespace n ON c.relnamespace = n.oid
      WHERE n.nspname = 'public'
        AND c.relkind = 'r'
      ORDER BY c.relname
    )
  )
) AS realtime_configuration_analysis;

-- ============================================================================
-- SEKTION 10: INSTALLIERTE EXTENSIONS
-- ============================================================================

SELECT jsonb_pretty(
  jsonb_build_object(
    'section', 'installed_extensions',
    'timestamp', now(),
    'extensions', (
      SELECT jsonb_agg(
        jsonb_build_object(
          'extension_name', extname,
          'schema', n.nspname,
          'version', extversion,
          'relocatable', extrelocatable,
          'description', obj_description(e.oid, 'pg_extension')
        )
      )
      FROM pg_extension e
      JOIN pg_namespace n ON e.extnamespace = n.oid
      ORDER BY extname
    )
  )
) AS installed_extensions_analysis;

-- ============================================================================
-- SEKTION 11: DATABASE CONFIGURATION SETTINGS
-- ============================================================================

SELECT jsonb_pretty(
  jsonb_build_object(
    'section', 'database_settings',
    'timestamp', now(),
    'current_database', current_database(),
    'current_schema', current_schema(),
    'server_version', version(),
    'configuration_parameters', (
      SELECT jsonb_agg(
        jsonb_build_object(
          'parameter_name', name,
          'setting', setting,
          'unit', unit,
          'category', category,
          'short_description', short_desc,
          'context', context,
          'boot_value', boot_val,
          'reset_value', reset_val
        )
      )
      FROM pg_settings
      WHERE name LIKE '%supabase%'
         OR name LIKE '%auth%'
         OR name LIKE '%jwt%'
         OR name LIKE '%rls%'
         OR name IN ('max_connections', 'shared_buffers', 'work_mem',
                     'maintenance_work_mem', 'effective_cache_size')
      ORDER BY name
    )
  )
) AS database_settings_analysis;

-- ============================================================================
-- SEKTION 12: SUPABASE SCHEMA MIGRATIONS TABELLE
-- ============================================================================

SELECT jsonb_pretty(
  jsonb_build_object(
    'section', 'schema_migrations',
    'timestamp', now(),
    'migrations_table_exists', EXISTS(
      SELECT 1 FROM information_schema.tables
      WHERE table_schema = 'supabase_migrations'
        AND table_name = 'schema_migrations'
    ),
    'applied_migrations', (
      SELECT jsonb_agg(
        jsonb_build_object(
          'version', version,
          'statements', statements,
          'name', name
        ) ORDER BY version
      )
      FROM supabase_migrations.schema_migrations
    )
  )
) AS schema_migrations_analysis;

-- ============================================================================
-- SEKTION 13: AUTH SCHEMA TABELLEN (falls vorhanden)
-- ============================================================================

SELECT jsonb_pretty(
  jsonb_build_object(
    'section', 'auth_schema_info',
    'timestamp', now(),
    'auth_tables', (
      SELECT jsonb_agg(
        jsonb_build_object(
          'table_name', tablename,
          'owner', tableowner,
          'row_count', (
            SELECT count(*)
            FROM pg_class c
            JOIN pg_namespace n ON c.relnamespace = n.oid
            WHERE n.nspname = 'auth'
              AND c.relname = t.tablename
              AND c.relkind = 'r'
          )
        )
      )
      FROM pg_tables t
      WHERE schemaname = 'auth'
      ORDER BY tablename
    )
  )
) AS auth_schema_analysis;

-- ============================================================================
-- SEKTION 14: STORAGE SCHEMA TABELLEN (falls vorhanden)
-- ============================================================================

SELECT jsonb_pretty(
  jsonb_build_object(
    'section', 'storage_schema_info',
    'timestamp', now(),
    'storage_tables', (
      SELECT jsonb_agg(
        jsonb_build_object(
          'table_name', tablename,
          'owner', tableowner
        )
      )
      FROM pg_tables t
      WHERE schemaname = 'storage'
      ORDER BY tablename
    ),
    'storage_buckets', (
      SELECT jsonb_agg(
        jsonb_build_object(
          'bucket_id', id,
          'bucket_name', name,
          'public', public,
          'created_at', created_at
        )
      )
      FROM storage.buckets
    )
  )
) AS storage_schema_analysis;

-- ============================================================================
-- SEKTION 15: ALLE SCHEMAS IM DATABASE
-- ============================================================================

SELECT jsonb_pretty(
  jsonb_build_object(
    'section', 'database_schemas',
    'timestamp', now(),
    'schemas', (
      SELECT jsonb_agg(
        jsonb_build_object(
          'schema_name', schema_name,
          'schema_owner', schema_owner,
          'default_character_set_name', default_character_set_name
        )
      )
      FROM information_schema.schemata
      WHERE schema_name NOT IN ('pg_catalog', 'information_schema')
      ORDER BY schema_name
    )
  )
) AS database_schemas_analysis;

-- ============================================================================
-- SEKTION 16: ROLES UND USERS
-- ============================================================================

SELECT jsonb_pretty(
  jsonb_build_object(
    'section', 'database_roles',
    'timestamp', now(),
    'roles', (
      SELECT jsonb_agg(
        jsonb_build_object(
          'role_name', rolname,
          'is_superuser', rolsuper,
          'can_create_db', rolcreatedb,
          'can_create_role', rolcreaterole,
          'can_login', rolcanlogin,
          'connection_limit', rolconnlimit,
          'valid_until', rolvaliduntil,
          'bypass_rls', rolbypassrls,
          'member_of', (
            SELECT array_agg(r2.rolname)
            FROM pg_auth_members m
            JOIN pg_roles r2 ON m.roleid = r2.oid
            WHERE m.member = r.oid
          )
        )
      )
      FROM pg_roles r
      WHERE rolname NOT LIKE 'pg_%'
      ORDER BY rolname
    )
  )
) AS database_roles_analysis;

-- ============================================================================
-- SEKTION 17: TABLE SIZES UND ROW COUNTS
-- ============================================================================

SELECT jsonb_pretty(
  jsonb_build_object(
    'section', 'table_statistics',
    'timestamp', now(),
    'tables', (
      SELECT jsonb_agg(
        jsonb_build_object(
          'schema', schemaname,
          'table_name', relname,
          'row_count_estimate', n_live_tup,
          'dead_tuples', n_dead_tup,
          'last_vacuum', last_vacuum,
          'last_autovacuum', last_autovacuum,
          'last_analyze', last_analyze,
          'last_autoanalyze', last_autoanalyze,
          'table_size_bytes', pg_total_relation_size(schemaname||'.'||relname),
          'table_size_human', pg_size_pretty(pg_total_relation_size(schemaname||'.'||relname))
        )
      )
      FROM pg_stat_user_tables
      WHERE schemaname = 'public'
      ORDER BY relname
    )
  )
) AS table_statistics_analysis;

-- ============================================================================
-- SEKTION 18: SEQUENCES UND IHRE AKTUELLEN WERTE
-- ============================================================================

SELECT jsonb_pretty(
  jsonb_build_object(
    'section', 'database_sequences',
    'timestamp', now(),
    'sequences', (
      SELECT jsonb_agg(
        jsonb_build_object(
          'schema', schemaname,
          'sequence_name', sequencename,
          'data_type', data_type,
          'start_value', start_value,
          'min_value', min_value,
          'max_value', max_value,
          'increment_by', increment_by,
          'cycle', cycle,
          'last_value', (
            SELECT last_value
            FROM pg_sequences ps
            WHERE ps.schemaname = s.schemaname
              AND ps.sequencename = s.sequencename
          )
        )
      )
      FROM information_schema.sequences s
      WHERE sequence_schema = 'public'
      ORDER BY sequencename
    )
  )
) AS sequences_analysis;

-- ============================================================================
-- ENDE DER ANALYSE
-- ============================================================================

SELECT jsonb_pretty(
  jsonb_build_object(
    'section', 'analysis_complete',
    'timestamp', now(),
    'message', 'Supabase Konfigurations-Analyse abgeschlossen',
    'sections_available', ARRAY[
      '1. database_tables',
      '2. database_constraints',
      '3. database_indexes',
      '4. row_level_security_policies',
      '5. database_functions',
      '6. database_triggers',
      '7. table_privileges',
      '8. function_privileges',
      '9. realtime_configuration',
      '10. installed_extensions',
      '11. database_settings',
      '12. schema_migrations',
      '13. auth_schema_info',
      '14. storage_schema_info',
      '15. database_schemas',
      '16. database_roles',
      '17. table_statistics',
      '18. database_sequences'
    ],
    'notes', 'Jede Sektion kann einzeln ausgeführt werden. Alle Ausgaben sind im JSON-Format für einfaches Parsen durch ChatGPT.'
  )
) AS analysis_summary;
