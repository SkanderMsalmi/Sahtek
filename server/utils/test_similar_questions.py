import similar_questions

# Define some sample inputs
new_question = "How to learn programming?"
existing_questions = ["How to learn programming?", "how to learn program"]

# Call the get_most_similar_questions function
similar_questions = similar_questions.get_most_similar_questions(new_question, existing_questions)

# Print the result
print(similar_questions)
