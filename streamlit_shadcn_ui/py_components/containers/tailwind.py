# <script src="https://cdn.tailwindcss.com"></script>
import streamlit as st
st.container()

def tailwind_container(class_name: str):
    # code = f'''<div id="__container">test!!!</div>'''
    # # code += f'''<script src="https://cdn.tailwindcss.com"></script>'''
    # code += f'''
    #     <script src="https://cdn.tailwindcss.com"></script>
    #     <script>
    #         var container = document.getElementById("__container").parentNode;
    #             var shadowRoot = container.attachShadow({{mode: 'open'}});

    #             // Create a div inside the shadow root and add the class to it
    #             var shadowDiv = document.createElement("div");
    #             const classNames = "{class_name}".split(" ");
    #             console.log(classNames, shadowDiv, shadowRoot);
    #             classNames.forEach(className => {{
    #                 shadowDiv.classList.add(className);
    #             }});
    #             // shadowDiv.classList.add("{class_name}");
                
    #             shadowRoot.appendChild(shadowDiv);
    #     </script>
    # '''
    # print(code)
    cont = st.container()
    code = f'''
    <style>
    span{{
        background-color:red;
    }}
    </style>
    <script>
    console.log("testing")
    </script>
    <span>test</span>
    '''
    # cont._html(code)
    cont.markdown(code, unsafe_allow_html=True)
    # st.markdown(code, unsafe_allow_html=True)

    return cont
