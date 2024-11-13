# Shared Shopping Lists Web Application

A simple web application for managing shared shopping lists. The app follows a three-tier architecture (client, server, database) and a layered architecture (views, controllers, services, database). Users can create shopping lists, add items to them, mark items as collected, and deactivate shopping lists.

## Table of Contents

- [Overview](#overview)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

The **Shared Shopping Lists** application allows users to create, manage, and track shopping lists. It supports the following features:

- Create shopping lists
- Add items to shopping lists
- Mark items as collected
- Deactivate shopping lists
- View statistics for the number of shopping lists and items

The application uses **Node.js** with **Express** for the backend, **PostgreSQL** for the database, and is containerized using **Docker**.

## Requirements

Before running this project locally, ensure you have the following installed:

- [Docker](https://www.docker.com/get-started) (for containerization)
- [docker-compose](https://docs.docker.com/compose/) (for orchestration)

### Database Schema

The database schema includes two tables:

```sql
CREATE TABLE shopping_lists (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  active BOOLEAN DEFAULT TRUE
);

CREATE TABLE shopping_list_items (
  id SERIAL PRIMARY KEY,
  shopping_list_id INTEGER REFERENCES shopping_lists(id),
  name TEXT NOT NULL,
  collected BOOLEAN DEFAULT FALSE
);

## Usage
Main Page

When you visit the main page at http://localhost:7777, the page displays statistics about the shopping lists, including the number of active and inactive lists and items.

#### Add a Shopping List

    Navigate to http://localhost:7777/lists.
    Use the form to add a new shopping list by entering a name and clicking the "Create list" button.
    After creation, the list will appear on the page under the Active lists.

### Manage Items in a Shopping List

    Click on a shopping list to view its details.
    Add items by entering a item name for the item and clicking "Start a list entry".
    Mark items as "collected" by clicking the "Mark collected" button next to the item.

### Deactivate a Shopping List

Each shopping list page has a button to deactivate the list. This sets the list's status to inactive.

### Testing

The project includes automated end-to-end tests to verify its functionality. To run the tests using Playwright, execute the following command:

npx playwright test

Test Features

    Create and list shopping lists
    Add and list items in a shopping list
    Mark items as collected
    Deactivate shopping lists