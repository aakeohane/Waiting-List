# Waitlist Management System

The staff-facing interface for managing a real-time client queue. Front 
desk staff use this application to add clients to the waitlist as they 
request rooms, with updates reflected instantly on the customer-facing 
display.

## How It Works

A staff member at the front desk adds a client's name to the queue when 
they request a room. That entry is written to Google Firestore and 
immediately appears on the customer-facing screen display, showing clients 
their place in line in real time.

## Features

- Staff interface for adding and managing queue entries
- Writes to Google Firestore in real time
- Instantly syncs with the customer-facing display screen
- Clean, fast UI built for front desk use

## Tech Stack

- JavaScript (vanilla)
- HTML / CSS
- Webpack
- Google Firebase / Firestore

## Related Repositories

This project is part of a two-part waitlist system built for a spa client:

| Repo | Purpose |
|------|---------|
| [Waiting-List](https://github.com/aakeohane/Waiting-List) | Staff-facing interface to manage and add clients to the queue |
| [screenreader-waitlist](https://github.com/aakeohane/screenreader-waitlist) | Customer-facing screen showing live queue position |

## Background

Built as a freelance client project in 2023 for a spa needing a simple, 
real-time queue management solution. Staff control the queue from one 
interface while clients watch their position update live on a separate 
display.
