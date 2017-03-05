# An Introduction to CQRS

## What is CQRS

* Command Query Responsibility Separation
* Separating write from read

> ### Notes:
> Performance 
> * Ability to scale write and read separately
> * Remove unnecessary business logic from read
> * Read models are optimised for read

## What CQRS isn't
* Domain Driven Design (DDD)
* Event Sourcing

> ### Notes:
> DDD 
> * Focuses on aligning code to the business for robustness, agility and improved communication
> * Reducing complexity - focus on smaller, understandable components
> Event Sourcing
> * Keep entire history of the system
> * Auditing ability
> * Find where problems were introduced
> * Allow read models to optimise their view of data

## In The Beginning There Were Tests

> ### Steps:
> * Checkout step-1 with empty solution
> * Add HomeController to MVC project with Index and Add actions
> * Write SpecFlow features 
> * Add IReadModelFacade to the Model folder

## Command vs. Event
* Commands are requests that may be accepted or rejected
* Events describe what has occurred

> ### Notes:
> * Discuss splitting solution into UI, Application, Domain, Infrastructure layers. Where do commands and events live?
> * Commands should be written in ?? language. Events in past tense.
>
> ### Steps:
> * Checkout step-2 if required
> * Add Class Library SimpleCQRS
> * Move ReadModels
> * Write Command for AddInventoryItem
> * Write blank Message interface
> * Write FakeBus class
> * New up command and put on bus in Add action

## Command Handlers
* The coordinators

> ### Notes:
> * Import all infrastructure, quick overview of the bus
> * Create interfaces for the command handlers

## Modeling the domain
* The aggregate root

> ### Notes:
> * Implement domain and concrete command handlers
> * Wireup application start with new command handlers

## Read Models

## Areas to Consider
* Concurrency - check versions before saving
* Two-phase commits - store and put message on queue
* Eventual consistency
