import java.util.ArrayList;
import java.util.Scanner;

class Student {
    private String name;
    private int rollNumber;
    private int age;
    private String course;

    public Student(String name, int rollNumber, int age, String course) {
        this.name = name;
        this.rollNumber = rollNumber;
        this.age = age;
        this.course = course;
    }

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getRollNumber() { return rollNumber; }
    public void setRollNumber(int rollNumber) { this.rollNumber = rollNumber; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    public String getCourse() { return course; }
    public void setCourse(String course) { this.course = course; }

    @Override
    public String toString() {
        return "Roll No: " + rollNumber + " | Name: " + name + " | Age: " + age + " | Course: " + course;
    }
}

public class StudentManagementSystem {
    private static ArrayList<Student> studentList = new ArrayList<>();
    private static Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        while (true) {
            System.out.println("\n--- Student Management System ---");
            System.out.println("1. Add Student");
            System.out.println("2. View All Students");
            System.out.println("3. Update Student");
            System.out.println("4. Delete Student");
            System.out.println("5. Exit");
            System.out.print("Choose an option: ");

            int choice = scanner.nextInt();
            scanner.nextLine(); // Consume newline

            switch (choice) {
                case 1: addStudent(); break;
                case 2: viewStudents(); break;
                case 3: updateStudent(); break;
                case 4: deleteStudent(); break;
                case 5: 
                    System.out.println("Exiting System. Goodbye!");
                    return;
                default: 
                    System.out.println("Invalid choice. Please try again.");
            }
        }
    }

    private static void addStudent() {
        System.out.print("Enter Name: ");
        String name = scanner.nextLine();
        System.out.print("Enter Roll Number: ");
        int roll = scanner.nextInt();
        System.out.print("Enter Age: ");
        int age = scanner.nextInt();
        scanner.nextLine();
        System.out.print("Enter Course: ");
        String course = scanner.nextLine();

        studentList.add(new Student(name, roll, age, course));
        System.out.println("Student added successfully!");
    }

    private static void viewStudents() {
        if (studentList.isEmpty()) {
            System.out.println("No students found.");
        } else {
            System.out.println("\n--- List of Students ---");
            for (Student s : studentList) {
                System.out.println(s);
            }
        }
    }

    private static void updateStudent() {
        System.out.print("Enter Roll Number to update: ");
        int roll = scanner.nextInt();
        scanner.nextLine();

        for (Student s : studentList) {
            if (s.getRollNumber() == roll) {
                System.out.print("Enter New Name: ");
                s.setName(scanner.nextLine());
                System.out.print("Enter New Age: ");
                s.setAge(scanner.nextInt());
                scanner.nextLine();
                System.out.print("Enter New Course: ");
                s.setCourse(scanner.nextLine());
                System.out.println("Student updated successfully!");
                return;
            }
        }
        System.out.println("Student with Roll Number " + roll + " not found.");
    }

    private static void deleteStudent() {
        System.out.print("Enter Roll Number to delete: ");
        int roll = scanner.nextInt();
        
        for (int i = 0; i < studentList.size(); i++) {
            if (studentList.get(i).getRollNumber() == roll) {
                studentList.remove(i);
                System.out.println("Student deleted successfully!");
                return;
            }
        }
        System.out.println("Student with Roll Number " + roll + " not found.");
    }
}
