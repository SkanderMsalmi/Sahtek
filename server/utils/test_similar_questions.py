import similar_questions

# Define some sample inputs
new_question = "ros"
existing_questions = ["horse", "What is the capital of Germany?"]

# Call the get_most_similar_questions function
similar_questions = similar_questions.get_most_similar_questions(new_question, existing_questions)

# Print the result
print(similar_questions)
