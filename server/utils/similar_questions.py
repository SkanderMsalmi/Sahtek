import Levenshtein
# def get_most_similar_questions(new_question, existing_questions):
#     """
#     Returns a list of the most similar existing questions to a new question, sorted by similarity.
#     Only questions with a Levenshtein similarity greater than or equal to 0.8 are considered.
#     """
#     similar_questions = []
#     for existing_question in existing_questions:
#         similarity = Levenshtein.ratio(new_question, existing_question)
#         if similarity >= 0.1:
#             similar_questions.append( existing_question )
#     return  similar_questions 


import Levenshtein

def get_most_similar_questions(new_question, existing_questions):
    """
    Returns a list of the most similar existing questions to a new question, sorted by similarity.
    Only questions with a Levenshtein similarity greater than or equal to 0.8 are considered.
    """
    similar_questions = []
    for existing_question in existing_questions:
        similarity = Levenshtein.ratio(new_question, existing_question )
        if similarity >= 0.1:
            similar_questions.append({"text": existing_question , "similarity": similarity})
    similar_questions = sorted(similar_questions, key=lambda x: x["similarity"], reverse=True)
    return similar_questions
