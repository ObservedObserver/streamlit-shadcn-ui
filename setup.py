import setuptools

with open("README.md", "r") as fh:
    long_description = fh.read()

setuptools.setup(
    name="streamlit-shadcn-ui",
    version="0.1.4",
    author="Observed Observer",
    author_email="elwynn.c@kanaries.net",
    description="Use shadcn-ui components in Streamlit",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/ObservedObserver/streamlit-shadcn-ui",
    packages=setuptools.find_packages(),
    include_package_data=True,
    classifiers=[],
    python_requires=">=3.7",
    install_requires=[
        # By definition, a Custom Component depends on Streamlit.
        # If your component has other Python dependencies, list
        # them here.
        "streamlit >= 0.63",
        "streamlit_extras >= 0.3.5"
    ],
    # extras_require={
    #     "devel": [
    #         "wheel",
    #         "pytest==7.4.0",
    #         "playwright==1.36.0",
    #         "requests==2.31.0",
    #         "pytest-playwright-snapshot==1.0",
    #         "pytest-rerunfailures==12.0",
    #     ]
    # }
)
