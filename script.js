document.addEventListener("DOMContentLoaded", () => {
    /* --- Scroll Animations --- */
    const faders = document.querySelectorAll('.fade-in');
    const blurReveals = document.querySelectorAll('.blur-reveal');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    blurReveals.forEach(blur => {
        appearOnScroll.observe(blur);
    });

    /* --- Chatbot Logic --- */
    const chatbotWindow = document.getElementById("chatbotWindow");
    const chatbotToggler = document.getElementById("chatbotToggler");
    const closeIcon = document.querySelector(".close-icon");
    const botIcon = document.querySelector(".fa-bots");
    const sendBtn = document.getElementById("sendChatBtn");
    const chatInput = document.getElementById("chatbotInput");
    const chatbox = document.getElementById("chatbox");

    // Toggle Chatbot
    chatbotToggler.addEventListener("click", () => {
        chatbotWindow.classList.toggle("show");
        if (chatbotWindow.classList.contains("show")) {
            closeIcon.style.display = "block";
            botIcon.style.display = "none";
        } else {
            closeIcon.style.display = "none";
            botIcon.style.display = "block";
        }
    });

    const createChatMessage = (message, className) => {
        const chatLi = document.createElement("div");
        chatLi.classList.add("chat", className);
        chatLi.innerHTML = `<p>${message}</p>`;
        return chatLi;
    };

    const generateResponse = (userMessage) => {
        const input = userMessage.toLowerCase();
        let response = "Sorry, I can only answer questions related to Drishika Parida's portfolio.";

        if (input.includes("who") || input.includes("drishika")) {
            response = "Drishika Parida is a Computer Science Engineering student passionate about programming and building software solutions.";
        } else if (input.includes("skill") || input.includes("tech") || input.includes("language")) {
            response = "Drishika is skilled in Java and C. She also has knowledge of Operating Systems, Data Structures, and tools like Git and VS Code.";
        } else if (input.includes("project")) {
            response = "Some of Drishika's featured projects include a Student Management System, a Matrix Calculator, and this Portfolio Website.";
        } else if (input.includes("education") || input.includes("study") || input.includes("college")) {
            response = "She is currently pursuing a B.Tech in Computer Science Engineering (2023-2027).";
        } else if (input.includes("contact") || input.includes("email") || input.includes("hire")) {
            response = "You can contact Drishika via email at drishika@example.com or connect with her on LinkedIn and GitHub.";
        }

        setTimeout(() => {
            const botMessage = createChatMessage(response, "incoming");
            chatbox.appendChild(botMessage);
            chatbox.scrollTo(0, chatbox.scrollHeight);
        }, 600);
    };

    const handleChat = () => {
        const userMessage = chatInput.value.trim();
        if (!userMessage) return;

        chatInput.value = "";
        chatbox.appendChild(createChatMessage(userMessage, "outgoing"));
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(userMessage);
    };

    sendBtn.addEventListener("click", handleChat);
    chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") handleChat();
    });

    /* --- Code Viewer Modal Logic --- */
    const codeModal = document.getElementById("codeModal");
    const codeArea = document.getElementById("codeArea");
    const modalTitle = document.getElementById("modalTitle");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const copyCodeBtn = document.getElementById("copyCodeBtn");
    const viewCodeBtns = document.querySelectorAll(".view-code-btn");

    const projectCodes = {
        "student-management": {
            title: "Student Management System (Java)",
            code: `import java.util.ArrayList;
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
    
    // Getters and Setters omitted for brevity...

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
            System.out.println("\\n--- Student Management System ---");
            System.out.println("1. Add Student");
            System.out.println("2. View All Students");
            System.out.println("5. Exit");
            // ... Logic for Update/Delete
        }
    }
}`
        },
        "matrix-calculator": {
            title: "Matrix Calculator (Java)",
            code: `import java.util.Scanner;

public class MatrixCalculator {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("--- Matrix Calculator ---");
        // Addition and Multiplication Logic...
    }

    private static int[][] addMatrices(int[][] a, int[][] b, int r, int c) {
        int[][] result = new int[r][c];
        for (int i = 0; i < r; i++) {
            for (int j = 0; j < c; j++) {
                result[i][j] = a[i][j] + b[i][j];
            }
        }
        return result;
    }
}`
        },
        "portfolio-website": {
            title: "Personal Portfolio Website (HTML/CSS/JS)",
            code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Drishika Parida | Portfolio</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header class="navbar">...</header>
    <main>
        <section class="hero">...</section>
        <section class="projects">...</section>
    </main>
    <script src="script.js"></script>
</body>
</html>`
        }
    };

    viewCodeBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const projectId = btn.getAttribute("data-project");
            const project = projectCodes[projectId];

            if (project) {
                modalTitle.innerText = project.title;
                codeArea.innerText = project.code;
                codeModal.classList.add("show");
                document.body.style.overflow = "hidden"; // Prevent background scroll
            }
        });
    });

    const closeModal = () => {
        codeModal.classList.remove("show");
        document.body.style.overflow = "auto";
    };

    closeModalBtn.addEventListener("click", closeModal);
    codeModal.addEventListener("click", (e) => {
        if (e.target === codeModal) closeModal();
    });

    copyCodeBtn.addEventListener("click", () => {
        const codeText = codeArea.innerText;
        navigator.clipboard.writeText(codeText).then(() => {
            const originalText = copyCodeBtn.innerHTML;
            copyCodeBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
            setTimeout(() => {
                copyCodeBtn.innerHTML = originalText;
            }, 2000);
        });
    });

    /* --- Form Submission --- */
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Thank you for your message, Drishika will get back to you soon!");
            contactForm.reset();
        });
    }

    /* --- Smooth Scroll Fix (Edge Case) --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
