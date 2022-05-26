---
title: Eager Loading in Laravel
date: 2014-12-07
permalink: /blog/2014/12/07/eager-loading-in-laravel/
---
Laravel comes with a powerful ORM i.e. Eloquent. While it gives you a lot of power, it is to be used with care as it can completely hide the fact that you might be using it to write completely inefficient queries. You will never want to wake up in the morning one day, finding out that your application has been hosed because of some query that you wrote and it killed the database.

In this article, I am going to be writing about the eager loading in Laravel 4 and how can it be used to tackle the inefficient database queries. To be more specific, I'll be writing about N+1 problem with eager loading. First things first, let's discuss what N+1 problem actually is.

# N+1 Problem

N+1 problem is related to the inefficient queries i.e. running one query and then running N queries for the records returned by that first query ..didn't understand? No worries, you'll understand it in a moment.

Let's say we are developing that web based library management system for one of those colleges where under every stone lurks a student. In your database, we have got *two tables*, to make things simple, let's say `students` and `books`. As you can guess, there is one to many relation between both the tables as one student can have many books. Suppose, we want to get all the students and their books and we write the following SQL Statements to do so

```sql
-- Select all the students
SELECT * FROM students;

-- Through a loop over the students you got from the above query, you get the books
SELECT * FROM books WHERE student_id = ?
```

The above query alleviates the N+1 problem i.e. firstly, there is `one` select statement to get the students and then N additional selects for the books, where N is the number of students. In case of a large number of students and books as in our case, performance hit would be really significant. Now, above were just simple SQL statements so it was easy for us to guess the trap that we were setting for ourselves. 

Let's say our system is being developed on top of Laravel and we have used it's awesome Eloquent ORM to aid us in the development. We have got two models i.e. `Student` and `Book` and the relationship between `Student` and the book is as follows:

```php
// Model : Student
public function books(){
    $this->hasMany('Book');
}
```

Now as we wanted to get all the students and the books they have got issued, using eloquent, we might be tempted to do the following:

```php
$students = Student::all();
foreach( $students as $student ) {
    echo $student->name;    
    $books = $student->books;
    // Do someting with the $books
}
```

It will work exactly how it is intended to work that is, it will get us the students and foreach of the students it will get us the books we want. From the above snippet, there doesn't seem to be anothing wrong with this code, but let's see what's going on under the hood. 

Below are the queries that will be executed for this:

```sql
-- Select the students i.e. Student::all();
SELECT * FROM students;

-- Foreach of the students, another query to select the books
-- i.e. $student->books part of the loop
SELECT * FROM books WHERE student_id = 1
SELECT * FROM books WHERE student_id = 2
SELECT * FROM books WHERE student_id = 3
SELECT * FROM books WHERE student_id = 4
SELECT * FROM books WHERE student_id = 5
SELECT * FROM books WHERE student_id = 6
SELECT * FROM books WHERE student_id = 7
SELECT * FROM books WHERE student_id = 8
...
```

Notice how inefficient it will be in our case. Let's say we have got 1000 students then there will be 1 query to get the students then one query for each of students to get the books so there will be 1000+1 queries (thus N+1 problem) while we *might have* written two queries to handle this

```sql
SELECT * FROM students;
SELECT * FROM books WHERE student_id IN (1,2,3,4,5,6,7,8..);
```

# Eager Loading
Eager loading is how Laravel allows us to tackle the N+1 problem. It lets us specify the records that we need pre-hand resulting in more efficient database queries. Let me explain it with the example stated above. Assuming that the relationship between the `Student` and `Book` as stated above is in place, to avail eager loading we will have to modify our above statements as follows

```php
$students = Student::with('books')->get();
foreach( $students as $student ) {
    echo $student->name;    
    $books = $student->books;
    // Do someting with the $books
}
```

What we are doing here by `Student::with('books')->get();` is letting Laravel know that we will need `books` for the students as well so make sure to load them `with` books. After making use of this, Laravel will be executing two queries i.e.

```sql
SELECT * FROM students;
SELECT * FROM books WHERE student_id IN (1,2,3,4,5,6,7,8..);
```

As you can see, while making use of Laravel's eager loading, a slight modification in our retrieval process has allowed us to make our queries efficient i.e. contrary to the previously stated way in which there were N queries for N records retruned by our first query, we will only be executing two queries to get whatever number of students we have in our database.

In different scenarios, you might need to eager load differently. Below, I state some of the ways that you can use to get the most out of eager loading.

If you want, you can **eager load multiple relations** at one time, for example let's say if we have `books` as well as `classes` in a `Student`, we might do the following to eager load all the `books` and `classes`

```php
$students = Student::with('books', 'classes')->get();
foreach( $students as $student ) {
    echo $student->name;    
    $books = $student->books;
    $classes = $student->classes();
    // Do someting with the $books/$classes
}
```

You may even **eager load nested relationships**. Extending from our last example, let's our `Book` model is further related to `Author`, we may do the following to eager load the `students`, `books` and the `authors` of those books

```php
$students = Student::with('books.authors')->get();
foreach( $students as $student ) {
    echo $student->name;
    $books = $student->books;
    
    foreach ( $books as $book )
    {
        $authors = $book->authors;
    }
}
```

Laravel also allows you to eager load with constraints so that you may not get all the records when you only want some. Proceeding with the previously stated examples, lets say we want all the students and the books but only those books that have the `status` set to `returned`, we'll do the following

```php
$students = Student::with(array('books' => function( $query ){
    $query->where('status', '=', 'returned');
}))->get();

foreach( $students as $student ) {
    echo $student->name;    
    $books = $student->books;
    // Do someting with the $books
}
```

In the above example we'll be loading only those books that have the `status` set to `returned`.

# Final Words
I hope you would have understood the N+1 problem and eager loading in Laravel by now. I encourage you to use eager loading whenever possible to make your database queries more robust. If you have any questions please do not hesitate to ask them by posting them in the comment section below.
