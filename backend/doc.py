import os

from PyPDF2 import PdfReader


def getDoc(file):
        
    text = ""

    pdf = PdfReader(file)    
    for page in pdf.pages:
            text += page.extract_text()

    text = text.replace("\n", "")

    return text

if __name__ == "__main__":

    with open('./test/SE3314b Assignment3-2022.pdf', 'rb') as f:
            text = getDoc(f)

            f.close()


    with open('./test/test.txt', 'w', encoding="utf-8") as f:
            f.write(text)
            f.close()

#     with open('./test/SE3309a2022asgn03.pdf', 'rb') as f:

#             text = getDoc(f)

#             f.close()

    
#     with open('./test/test.txt', 'w', encoding="utf-8") as f:
#             f.write(text)
#             f.close()
