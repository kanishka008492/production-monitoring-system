# Production Management System

## Smart Production Monitoring

A web-based Production Management System designed to monitor production orders, track completed quantities, calculate progress, and identify production priorities automatically.

## Features

* Create production orders
* Enter required and completed quantities
* Automatically calculate remaining quantity
* Automatically calculate production progress
* Automatically identify production status
* Display days remaining until deadline
* Automatic priority levels:

  * **Normal** — more than 7 days remaining
  * **High** — 4–7 days remaining
  * **Urgent** — 0–3 days remaining
* Detect overdue production orders
* Display urgent alerts for overdue orders
* Update completed production quantity
* Automatically move completed orders to **Completed Orders**
* Delete existing production orders
* Dashboard with:

  * Total Orders
  * In Progress
  * Completed
  * Overdue
* Save production data using browser local storage
* Preserve production data after closing and reopening the website
* Separate Production Monitoring and Completed Orders sections
* Clean spacing between production cards

## Technologies Used

* **HTML** — Website structure
* **CSS** — Design and layout
* **JavaScript** — Production calculations, status updates, priority detection, alerts, and data management
* **LocalStorage** — Saving production data in the browser

## How It Works

### 1. Create Production

The user enters:

* Product Name
* Required Quantity
* Completed Quantity
* Deadline

The system creates a production order.

### 2. Automatic Monitoring

The system automatically calculates:

* Remaining Quantity
* Progress Percentage
* Production Status
* Days Remaining
* Priority

### 3. Update Production

When production increases, the user can select **Update Production** and enter the latest completed quantity.

The system automatically updates the remaining quantity, progress percentage, and status.

### 4. Completion

When the completed quantity reaches the required quantity:

* Progress becomes **100%**
* Status becomes **Completed**
* The order is removed from Production Monitoring
* The order appears under Completed Orders
* Dashboard counts are updated

### 5. Overdue Detection

If an active production order passes its deadline, the system identifies it as overdue and displays an urgent alert.

## Dashboard

The dashboard provides a quick production summary:

| Dashboard Item | Description                               |
| -------------- | ----------------------------------------- |
| Total Orders   | Total number of production orders         |
| In Progress    | Orders currently being produced           |
| Completed      | Orders that reached the required quantity |
| Overdue        | Active orders that passed their deadline  |

## Data Storage

Production information is stored using the browser's **LocalStorage**.

This allows the saved production orders to remain available even after the website is closed and reopened.

## Project Objective

The main objective of this project is to create a simple and practical digital production monitoring system that reduces manual calculation and provides automatic production status, progress, priority, and deadline monitoring.

## Future Scope

The system can be extended in the future with:

* User login and authentication
* Cloud database storage
* Multiple user access
* Production reports
* Data visualization and charts
* Email or mobile notifications
* AI-based production forecasting
* Machine and sensor integration
* Automatic production data collection

## Conclusion

The Production Management System provides a simple web-based solution for managing production orders and monitoring their progress. It combines manual production input with automatic calculations and status detection to make production tracking easier and more organized.

