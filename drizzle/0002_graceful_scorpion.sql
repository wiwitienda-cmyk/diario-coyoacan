CREATE TABLE `newsArticles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(255) NOT NULL,
	`title` text NOT NULL,
	`summary` text NOT NULL,
	`content` text NOT NULL,
	`heroImage` varchar(500) NOT NULL,
	`category` varchar(100) NOT NULL,
	`date` varchar(100) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `newsArticles_id` PRIMARY KEY(`id`),
	CONSTRAINT `newsArticles_slug_unique` UNIQUE(`slug`)
);
