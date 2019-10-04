BEGIN;

DROP TABLE IF EXISTS labels_objects;
DROP TABLE IF EXISTS labels;

-----------------

ALTER TABLE events DROP COLUMN thread_diagnostic_edge_id;
DROP TABLE IF EXISTS thread_diagnostic_edges;

-----------------

ALTER TABLE events DROP COLUMN rule_id;
DROP TABLE IF EXISTS rules;
ALTER TABLE campaigns DROP COLUMN due_date;
ALTER TABLE campaigns DROP COLUMN start_date;
ALTER TABLE campaigns DROP COLUMN is_draft;
ALTER TABLE campaigns DROP COLUMN extension_data;

ALTER TABLE threads DROP COLUMN pending_patch;
ALTER TABLE threads DROP COLUMN is_pending_external_creation;
ALTER TABLE threads DROP COLUMN is_draft;

-----------------

DROP TABLE IF EXISTS commit_status_contexts;

-----------------

DROP TABLE IF EXISTS events;

-----------------

ALTER TABLE campaigns DROP COLUMN primary_comment_id;
ALTER TABLE threads DROP COLUMN primary_comment_id;

DROP TABLE IF EXISTS comments;

-----------------

DROP TABLE IF EXISTS campaigns_threads;

-----------------

DROP TABLE IF EXISTS campaigns;

-----------------

DROP TABLE IF EXISTS threads;

COMMIT;
