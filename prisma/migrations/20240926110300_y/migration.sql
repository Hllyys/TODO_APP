-- CreateTable
CREATE TABLE "tasks" (
    "explation" VARCHAR NOT NULL,
    "category" VARCHAR NOT NULL,
    "date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" VARCHAR NOT NULL,
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "tasks_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "name" VARCHAR NOT NULL,
    "surname" VARCHAR NOT NULL,
    "nickname" VARCHAR NOT NULL,
    "mail" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "id" SERIAL NOT NULL,
    "created_date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pk" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "fk_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
