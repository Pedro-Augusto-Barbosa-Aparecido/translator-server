-- CreateTable
CREATE TABLE "words" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "word" TEXT NOT NULL,
    "translate" TEXT NOT NULL,
    "sep_sila" TEXT
);

-- CreateTable
CREATE TABLE "examples" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "example" TEXT NOT NULL,
    "wordID" TEXT,
    "reference" TEXT,
    CONSTRAINT "examples_wordID_fkey" FOREIGN KEY ("wordID") REFERENCES "words" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
