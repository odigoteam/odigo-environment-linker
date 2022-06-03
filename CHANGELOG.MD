# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Fixed
- Prototype Pollution in async - Upgrade async to version 2.6.4
- Issue #2 pif+pef displayed even if they are unchecked in configuration
- Report issue link redirect on wrong URL
- Badges T-shirt size and version with dark mode are not readable
## [4.5.2]
### Fixed
- Navigation from welcome view to configuration was broken
- General tab was disappeared
## [4.5.0]
### Added
- Introduce Easter Eggs
### Fixed
- Fix node-forge vulnerability

## [4.4.0]
### Added
- 3 states AWS filter checkbox
### Changed
- CSS improvement in Appearance tab content
- Reorder (alphabetically) the conf tabs
### Fixed
- Fix CX Studio button text
- CustomLinkService.parseUrl(url) was called for all links even those not custom

## [4.3.0] <font size="2">*- 2022-03-14*</font>
### Added
- Links for qualification center and CX Studio
### Changed
- Purple color (back to Odigo's pink)

## [4.2.0] <font size="2">*- 2022-03-08*</font>
### Added
- Custom links**
- Hub link for env with version >= 6.0
- Configuration data model migration
- Add 6.0 to version filter dropdown
### Changed
- Centralize all messages in `messages.ts` file
- Usage of nested router for configuration view
- Change CMDB file type option select to Bootstrap dropdown component
- Change AWS logo
### Fixed
- Fix grammatical errors in messages
- Fix CSS background issue with url checker icon
- AWS button is not disabled if tab is not AWS console
- Improve VPN connection checking
- CSS for version filter badge

## [4.1.0] <font size="2">*- 2022-02-23*</font>
### Added
- About view
- CHANGELOG.md
- Configuration URL checker (by http request)
- T-Shirt size info per environments
- Update CMDB link to Jenkins OAM Job (/JenkinsOAM/job/01-CreateUpdateCustomCMDB-Step1/build) pre-filled with CLIENT_ID, CLIENT_SITE, CLIENT_CLUSTERID and CLIENT_ENV vars
- Reset filters button
### Changed
- Rewording
- Redesign configuration view
- replace X icon on configuration view by Save icon
- Small infos on configuration options to explain each options
- AWS role switch : the color of environment type (DEV, INT, QUA, PREPROD, PROD, Other) is reported in AWS console
### Fixed
- Control configuration URL validity by send a GET request with it

## [4.0.0] <font size="2">*- 2022-02-14*</font>
### Changed
- Move project to Angular 13 + Bootstrap
- Move extension (not conf generator) to Github
- Refactor configuration view
### Fixed
- All option not selected at first extension usage
- Exclude DEV from version filters
- Colors of switch fixed for dark theme

## 3.12 <font size="2">*- 2022-02-01*</font>
### Changed
- Fix style for switch
- Update logos
### Fixed
- SSH slave link in configuration generation
- Close extension popup when AWS role button is clicked

## 3.11 <font size="2">*- 2022-02-01*</font>
### Added
- AWS role switch link
- Release note view
- Versions filter
### Changed
- CSS improvement
- Transform all modules in Javascript classes

## 3.10 <font size="2">*- 2022-01-24*</font>
### Added
- Dark mode theme

## 3.9 <font size="2">*- 2022-01-12*</font>
### Added
- Add "no result" message on environments list
### Changed
- Refactoring build
- CSS improvement

## 3.8 <font size="2">*- 2022-01-06*</font>
### Fixed
- CSS issue

## 3.7 <font size="2">*- 2022-01-06*</font>
### Added
- Introduce MPA in environments list
### Fixed
- Manage empty urls

## 3.6 <font size="2">*- 2022-01-05*</font>
### Fixed
- Firefox code smells

## 3.5 <font size="2">*- 2022-01-05*</font>
### Added
- Add extension version at the bottom of configuration screen
### Changed
- Firefox CSS improvements
- Improve CSS for configuration view
### Fixed
- Firefox code smells

## 3.4 <font size="2">*- 2022-01-04*</font>
### Added
- Add `Only icon` option

## 3.3 <font size="2">*- 2022-01-04*</font>
### Added
- Introduce the `updates.json` file for Firefox auto update
- Clear search field button
### Changed
- Design improvement
### Fixed
- Tooltip bug

## 3.2 <font size="2">*- 2021-12-23*</font>
### Changed
- Rework loader to css animated one

## 3.1 <font size="2">*- 2021-12-23*</font>
### Added
- Extended search (thanks [Mathieu Soysal](https://github.com/MathieuSoysal))
- Result counter
### Changed
- Refactoring code (create module for each configuration, rendering, search and utils components)
- Rewording
- CSS improvement

## 3.0 <font size="2">*- 2021-12-22*</font>
### Fix
- Control that configuration url is raw one

## 2.11 <font size="2">*- 2021-12-18*</font>
### Changed
- Remove external link for health check
- Manage configuration file renaming (`occ-env-urls.json` to `configuration.json`)
- Redesign scrollbars
- Redesign list
- Redesign configuration screen
- Display option for external links
- CMDB file type option

## 2.10 <font size="2">*- 2021-12-18*</font>
### Added
- Add client domain in list and configure the display
- Introduce lodash lib
### Changed
- Rewording
- Style in configuration panel for client name domain version, same as the list one
- Refactor configuration object

## 2.9 <font size="2">*- 2021-12-16*</font>
### Added
- Introduce Firefox version
### Changed
- Refactor project structure to manager cross browser compatibility
- Insert maven project version in manifest.json
### Fixed
- Typo

## 2.8 <font size="2">*- 2021-12-14*</font>
### Added
- Manage transition between v1 and v2 configuration file
### Fixed
- Environment type issue

## 2.7 <font size="2">*- 2021-11-26*</font>
### Added
- Portal and SSH Links
- Close button for configuration view
- Display links switch buttons in configuration screen
- Manage transition between v1 and v2 configuration file
### Changed
- Design reworking

## 2.4 <font size="2">*- 2021-11-25*</font>
### Added
- Add CMDB link
- Ignore MP01 in environments list
- Environment types (DEV/INT/QA/PREPROD/PROD/Others)
- Introduce Mustache.js to generate environment list

## 2.3 <font size="2">*- 2021-07-23*</font>
### Added
- Commit extension package
### Changed
- Rewording
- CSS improvement
### Fixed
- Configuration message hiding
### Removed
- Delete extension ZIP

## 2.1 <font size="2">*- 2021-07-22*</font>
### Added
- Add OCC Version per environments
### Changed
- Rewording
- CSS improvement
### Fixed
- Error message hiding

## 2.0 <font size="2">*- 2021-07-19*</font>
### Added
- Setup project (maven, jenkins)
- Setup Bootstrap & jQuery
- Error message
- URL Configuration view
- Loading view
- Environment view

## [0.0.7] <font size="2">*- 2015-02-16*</font>
### Added
- Link, and make it obvious that date format is ISO 8601.
### Changed
- Clarified the section on "Is there a standard change log format?".
### Removed
- Remove empty sections from CHANGELOG, they occupy too much space and
  create too much noise in the file. People will have to assume that the
  missing sections were intentionally left out because they contained no
  notable changes.
### Fixed
- Fix Markdown links to tag comparison URL with footnote-style links.

[Unreleased]: https://github.com/guitaro/odigo-environment-linker/compare/v4.5.2...HEAD
[4.5.2]: https://github.com/guitaro/odigo-environment-linker/releases/tag/v4.5.1
[4.5.0]: https://github.com/guitaro/odigo-environment-linker/releases/tag/v4.5.0
[4.4.0]: https://github.com/guitaro/odigo-environment-linker/releases/tag/v4.4.0
[4.3.0]: https://github.com/guitaro/odigo-environment-linker/releases/tag/v4.3.0
[4.2.0]: https://github.com/guitaro/odigo-environment-linker/releases/tag/v4.2.0
[4.1.0]: https://github.com/guitaro/odigo-environment-linker/releases/tag/v4.1.0
[4.0.0]: https://github.com/guitaro/odigo-environment-linker/releases/tag/v4.0.0
