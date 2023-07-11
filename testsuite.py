#!/usr/bin/python3

import os
import subprocess
import sys
import typing


def getAllFilesPath() -> typing.List[str]:
	paths = []
	for root, dirs, files in os.walk("ts-testsuite/tests/cases/conformance"):
		for file in files:
			paths.append(os.path.join(root, file))

	return paths


def info(message: str) -> None:
	message = "INFO: " + message
	print("\n" + "-" * len(message), message, "-" * len(message) + "\n", sep="\n")


def error(message: str) -> None:
	message = "ERROR: " + message
	print("\n" + "-" * len(message), message, "-" * len(message) + "\n", sep='\n', file=sys.stderr)
	sys.exit(1)


def runSingleFile(path: str) -> None:
	code = subprocess.call(["npx", "tsx", "./src/main.ts", "-i", path], shell=True)
	if code != 0:
		error("Python testsuite failed, error on file " + path)


def main() -> None:
	allPaths = getAllFilesPath()

	for path in allPaths:
		info("Running testsuite file " + path)
		runSingleFile(path)


if __name__ == '__main__':
	main()
