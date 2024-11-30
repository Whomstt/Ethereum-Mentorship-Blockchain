package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"
)

// Define a struct to represent the structure of a course
type Course struct {
	CourseID    int    `json:"courseId"`
	CourseName  string `json:"courseName"`
	Description string `json:"description"`
	Duration    string `json:"duration"`
}

// Global variable to hold the loaded courses data
var courses []Course

// Function to load the courses data from the JSON file
func loadCoursesData(filePath string) error {
	// Open the JSON file
	file, err := os.Open(filePath)
	if err != nil {
		return fmt.Errorf("failed to open courses.json: %v", err)
	}
	defer file.Close()

	// Read the file content
	fileContent, err := ioutil.ReadAll(file)
	if err != nil {
		return fmt.Errorf("failed to read courses.json: %v", err)
	}

	// Unmarshal the JSON content into the courses slice
	err = json.Unmarshal(fileContent, &courses)
	if err != nil {
		return fmt.Errorf("failed to parse courses.json: %v", err)
	}

	return nil
}

// Function to retrieve course details by course ID
func getCourseByID(courseID int) (*Course, error) {
	for _, course := range courses {
		if course.CourseID == courseID {
			return &course, nil
		}
	}
	return nil, fmt.Errorf("course with ID %d not found", courseID)
}

// Function to get a formatted course details as a string
func getFormattedCourseDetails(courseID int) (string, error) {
	course, err := getCourseByID(courseID)
	if err != nil {
		return "", err
	}

	// Return a formatted string with the course details
	return fmt.Sprintf("Course Name: %s\nDescription: %s\nDuration: %s", course.CourseName, course.Description, course.Duration), nil
}

func main() {
	// Load the courses data from the JSON file
	err := loadCoursesData("src/data/courses.json")
	if err != nil {
		log.Fatalf("Error loading courses data: %v", err)
	}

	// Example: Retrieve and display course details for course ID 1
	courseDetails, err := getFormattedCourseDetails(1)
	if err != nil {
		log.Fatalf("Error getting course details: %v", err)
	}
	fmt.Println(courseDetails)
}
