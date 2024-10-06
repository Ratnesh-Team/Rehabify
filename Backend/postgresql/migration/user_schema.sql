CREATE TABLE users (
    id                    UUID PRIMARY KEY,  -- Corresponding to string ID in Go, UUID is suitable for unique identifiers
    name                  TEXT NOT NULL,     -- Name field, using TEXT for string types
    age                   INT NOT NULL,      -- Age field, using INT for integers
    gender                TEXT,              -- Gender field, using TEXT for string
    state                 TEXT,              -- State field, using TEXT for string
    district              TEXT,              -- District field, using TEXT for string
    guardian_name         TEXT,              -- GuardianName field, using TEXT for string
    addiction_type        TEXT,              -- AddictionType field, using TEXT for string
    addiction_duration    INT,               -- AddictionDuration field, using INT for integer values
    duration_of_treatment INT,               -- DurationOfTreatment field, using INT for integer values
    is_treatment_completed BOOLEAN,          -- IsTreatmentCompleted field, using BOOLEAN for true/false values
    under_treatment       BOOLEAN,           -- UnderTreatment field, using BOOLEAN for true/false values
    employment_status     INT,               -- EmploymentStatus field, using INT for integer status values
    nasha_mukti_centre_name TEXT,            -- NashaMuktiCentreName field, using TEXT for string
    nasha_mukti_centre_address TEXT,         -- NashaMuktiCentreAddress field, using TEXT for string
    nasha_mukti_centre_code TEXT,            -- NashaMuktiCentreCode field, using TEXT for string
    joining_date          DATE,              -- JoiningDate field, using DATE for dates
    counselling_count     INT,               -- CounsellingCount field, using INT for integer values
    counsellor_name       TEXT               -- CounsellorName field, using TEXT for string
);